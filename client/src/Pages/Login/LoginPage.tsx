import useAuth from '@Hooks/useAuth';
import { LoginData } from '@Types/index';
import { FormEvent, useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';

import * as API from '@API/index';
import { QueryClient } from '@tanstack/react-query';

export const loader = (queryClient: QueryClient) => async () => {
  try {
    await API.getAuthStatus();
    return { hasAuth: true };
  } catch (error) {
    return { hasAuth: false };
  }
};

const LoginView = () => {
  const naviage = useNavigate();
  const { signIn } = useAuth();

  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const loginData = Object.fromEntries(formData) as LoginData;

    setIsLogging(true);

    signIn(loginData, {
      onSuccess: () => naviage('/main', { replace: true }),
      onError: (error) => {
        setIsLogging(false);
        setError(error);
      },
    });
  };

  return (
    <div>
      <h2>로그인 페이지</h2>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLogging}>
          <div>
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              name="email"
              placeholder="example@example.com"
              defaultValue="sangpok@example.com"
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              defaultValue="sangpok"
            />
          </div>

          {error && <p>{error.message}</p>}

          <button type="submit">{isLogging ? '로그인 중...' : '로그인'}</button>
        </fieldset>
      </form>
    </div>
  );
};

const LoginPage = () => {
  const { hasAuth } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  if (hasAuth) {
    return <Navigate to="/main" />;
  }

  return <LoginView />;
};

export default LoginPage;

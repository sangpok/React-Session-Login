import { useGetUser } from '@Hooks/index';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';

import * as API from '@API/index';
import useAuth from '@Hooks/useAuth';

export const loader = (queryClient: QueryClient) => async () => {
  try {
    await API.getAuthStatus();

    queryClient.getQueryData(['user']) ??
      queryClient.fetchQuery({ queryKey: ['user'], queryFn: API.getUser });

    return { hasAuth: true };
  } catch (error) {
    return { hasAuth: false };
  }
};

const LoginedView = () => {
  const revalidator = useRevalidator();

  const { data: user, isPending, isError, error, isSuccess } = useGetUser();
  const { signOut } = useAuth();

  const handleClick = () => {
    signOut({ onSuccess: () => revalidator.revalidate() });
  };

  return (
    <>
      <p>반갑읍니다, {user?.nickname || '-'}님ㅋㅋ</p>
      <button onClick={handleClick}>로그아웃하기</button>
    </>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const { hasAuth } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <div>
      <h2>메인 페이지</h2>

      {!hasAuth && (
        <>
          <p>로그인 정보가 없네! 로그인부터 하쇼</p>
          <button onClick={() => navigate('/login', { replace: true })}>로그인하러 가기</button>
        </>
      )}

      {hasAuth && <LoginedView />}
    </div>
  );
};

export default MainPage;

import { FormEvent, KeyboardEvent, MouseEvent, useRef } from 'react';

import { useConfirmEmail, useConfirmNickname, useCreateAccount } from '@Hooks/index';
import { UserAuth } from '@Types/index';

import { useConfirmFields } from '@Hooks/useConfirmFields';
import { useNavigate } from 'react-router-dom';

const EmailField = () => {
  const { mutate, isPending, isError, error, isSuccess, reset } = useConfirmEmail();
  const { confirmField, unconfirmField, isConfirmedField } = useConfirmFields();

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonText = isPending ? '확인중' : '이메일 확인';

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate(inputRef.current!.value, {
      onSuccess: () => confirmField('email'),
    });
  };

  const handleChange = () => {
    if (isConfirmedField('email') || isError) {
      unconfirmField('email');
      reset();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current!.value !== '') {
      e.preventDefault();

      mutate(inputRef.current!.value, {
        onError() {
          inputRef.current!.disabled = false;
          inputRef.current!.focus();
        },
      });
    }
  };

  return (
    <div>
      <fieldset disabled={isPending}>
        <label htmlFor="email" style={{ display: 'block' }}>
          <strong>이메일</strong>
        </label>

        <input
          id="email"
          name="email"
          placeholder="example@example.com"
          defaultValue="sangpok@example.com"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button type="button" onClick={handleConfirm}>
          {buttonText}
        </button>
      </fieldset>

      {isError && <p style={{ color: 'red' }}>{error.message}</p>}
      {isSuccess && <p style={{ color: 'green' }}>사용 가능한~</p>}
    </div>
  );
};

const PasswordField = () => {
  return (
    <div>
      <label htmlFor="password" style={{ display: 'block' }}>
        <strong>비밀번호</strong>
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        defaultValue="sangpok"
      />
    </div>
  );
};

const NicknameField = () => {
  const { mutate, isPending, isError, error, isSuccess, reset } = useConfirmNickname();
  const { confirmField, unconfirmField, isConfirmedField } = useConfirmFields();

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonText = isPending ? '확인중' : '닉네임 확인';

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate(inputRef.current!.value, {
      onSuccess: () => confirmField('nickname'),
    });
  };

  const handleChange = () => {
    if (isConfirmedField('nickname') || isError) {
      unconfirmField('nickname');
      reset();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current!.value !== '') {
      e.preventDefault();

      mutate(inputRef.current!.value, {
        onError() {
          inputRef.current!.disabled = false;
          inputRef.current!.focus();
        },
      });
    }
  };

  return (
    <div>
      <label htmlFor="nickname" style={{ display: 'block' }}>
        <strong>닉네임</strong>
      </label>
      <input
        id="nickname"
        name="nickname"
        type="text"
        placeholder="nickname"
        defaultValue="김 주핸"
        ref={inputRef}
        disabled={isPending}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button type="button" onClick={handleClick} disabled={isPending}>
        {buttonText}
      </button>

      {isError && <p style={{ color: 'red' }}>{error.message}</p>}
      {isSuccess && <p style={{ color: 'green' }}>사용 가능한~</p>}
    </div>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useCreateAccount();
  const { isAllFieldConfirmed } = useConfirmFields({ email: false, nickname: false });

  const buttonText = isPending ? '가입중...' : '가입하기';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const submitData = Object.fromEntries(formData) as UserAuth;

    if (!isAllFieldConfirmed()) {
      return alert('확인을 좀 해보쇼');
    }

    mutate(submitData, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <EmailField />
      <br />
      <PasswordField />
      <br />
      <NicknameField />
      <br />

      {isError && <p style={{ color: 'red' }}>{error.message}</p>}

      <button type="submit" disabled={isPending}>
        {buttonText}
      </button>
    </form>
  );
};

const RegisterPage = () => {
  return (
    <div>
      <h2>회원가입</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

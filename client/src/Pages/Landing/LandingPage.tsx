import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>어서오세요, 회원가입이든 로그인이든 해보쇼</p>
      <button onClick={() => navigate('/register')}>회원가입</button>
      <button onClick={() => navigate('/login')}>로그인</button>
      <button onClick={() => navigate('/main')}>일단 메인 페이지 가기</button>
    </div>
  );
};

export default LandingPage;

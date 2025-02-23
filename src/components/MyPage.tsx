import React from 'react';
import { useAuth } from '../context/AuthContext';

const MyPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      {isLoggedIn ? (
        <div>
          <h1>마이페이지</h1>
          <p>환영합니다! 여기에 사용자 정보를 표시하세요.</p>
        </div>
      ) : (
        <div>
          <h1>마이페이지</h1>
          <p>로그인 후 이용 가능합니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyPage;
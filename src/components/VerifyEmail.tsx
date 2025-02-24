import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState('이메일 인증 중...');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        setMessage('잘못된 인증 요청입니다.');
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/auth/verify-email?token=${token}`, {
          method: 'GET',
        });

        if (response.ok) {
          setMessage('이메일 인증이 완료되었습니다. 이제 로그인할 수 있습니다.');
          setTimeout(() => navigate('/login'), 3000); // 3초 후 로그인 페이지로 이동
        } else {
          const data = await response.json();
          setMessage(data.message || '이메일 인증에 실패했습니다.');
        }
      } catch (error) {
        setMessage('서버와의 연결에 문제가 발생했습니다.');
      }
    };

    verifyUserEmail();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
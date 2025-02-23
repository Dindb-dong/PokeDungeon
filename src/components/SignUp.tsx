import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTab } from '../context/TabContext';
const apiUrl = import.meta.env.VITE_API_URL;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const { login } = useAuth();
  const { setActiveTab } = useTab();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      alert('모든 항목을 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('https://pokedungeon-be.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, region: 'Seoul' })
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다!');
        login();
        setActiveTab('마이페이지');
      } else {
        const data = await response.json();
        alert(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsPasswordMatch(value === password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '83.334%' }}>
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '420px',
          backgroundColor: '#fff',
        }}
      >
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>📝 회원가입</h1>

        {/* 이메일 입력 */}
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* 비밀번호 확인 입력 */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '16px',
              borderRadius: '8px',
              border: `1px solid ${isPasswordMatch ? '#C084FC' : '#FF4D4F'}`,
              transition: 'border-color 0.3s',
              boxSizing: 'border-box'
            }}
          />
          {!isPasswordMatch && (
            <div style={{ color: '#FF4D4F', fontSize: '14px', marginTop: '5px' }}>
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSignUp}
          style={{
            padding: '12px',
            backgroundColor: '#C084FC',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUp;
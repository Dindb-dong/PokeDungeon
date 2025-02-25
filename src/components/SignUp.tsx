import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTab } from '../context/TabContext';
import { getUserRegionByIP } from '../utils/locationUtils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const apiUrl = import.meta.env.VITE_API_URL;

interface PasswordValidatorProps {
  password: string;
}

const Button = styled.button`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  background-color: '#C084FC';
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  transition: transform 0.1s, box-shadow 0.1s;

  &:active {
    transform: scale(0.90);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: #a276ff;
  }
`;

const PasswordValidator: React.FC<PasswordValidatorProps> = ({ password }) => {
  const A = /[0-9]/.test(password); // 숫자 조건
  const B = /[a-zA-Z]/.test(password); // 영문 조건
  const C = /[\W_]/.test(password); // 특수문자 조건
  const D = password.length >= 8 && password.length <= 16; // 길이 조건

  // 충족되지 않은 조건 메시지 생성
  const invalidMessages = [];
  if (!A) invalidMessages.push('숫자를 포함해야 합니다.', '\n');
  if (!B) invalidMessages.push('영문을 포함해야 합니다.', '\n');
  if (!C) invalidMessages.push('특수문자를 포함해야 합니다.', '\n');
  if (!D) invalidMessages.push('8자 이상 16자 이하로 설정해야 합니다.', '\n');

  // 충족되지 않은 조건들을 줄바꿈으로 연결하여 출력
  return (
    <div>
      {invalidMessages.map((message, index) => (
        <div key={index} style={{ color: '#FF4D4F', fontSize: '14px', marginTop: '5px' }}>
          {message}
        </div>
      ))}
    </div>
  );
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [region, setRegion] = useState<string>(''); // ✅ 사용자의 지역 정보
  const { setActiveTab } = useTab();
  const navigate = useNavigate(); // ✅ 함수 외부에서 호출

  const checkPassWord = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      alert('모든 항목을 입력하세요.');
      return;
    }

    if (!email.includes('@')) {
      alert('올바른 이메일 형식을 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isPasswordValid) {
      alert('비밀번호 조건을 확인하세요.');
      return;
    }
    setLoading(true);
    const userRegion = await getUserRegionByIP();
    setRegion(userRegion); // 가져온 지역을 상태로 저장
    console.log(region);
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, region })
      });
      console.log(response);

      if (response.ok) {
        alert('회원가입이 완료되었습니다. 이메일을 확인해 주세요.');
        setActiveTab('로그인'); // 회원가입 후 로그인 화면으로 전환
        navigate('/login'); // ✅ 회원가입 후 로그인페이지로 이동
      } else {
        const data = await response.json();
        alert(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      alert('서버와의 연결에 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    };
  }

  const handleCheckEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsEmailValid(value.includes('@'));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsPasswordMatch(value === password);
  };

  const handleCheckPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsPasswordValid(checkPassWord(value));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '80%' }}>
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
            onChange={(e) => { setEmail(e.target.value); handleCheckEmailChange(e) }}
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
          {!isEmailValid && (
            <div style={{ color: '#FF4D4F', fontSize: '14px', marginTop: '5px' }}>
              올바른 이메일 형식을 입력하세요.
            </div>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => { setPassword(e.target.value); handleCheckPasswordChange(e) }}
            style={{
              padding: '10px',
              width: '100%',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
          {!isPasswordValid && (
            <PasswordValidator password={password} />
          )}
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
        <Button
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
            fontWeight: 'bold',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '가입 중...' : '회원가입'}
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
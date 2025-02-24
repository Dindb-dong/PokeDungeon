import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const LogIn: React.FC = () => {

  const handleLogin = async () => {
    const navigate = useNavigate();
    if (!email || !password) {
      alert('모든 항목을 입력하세요.');
      return;
    }

    if (!email.includes('@')) {
      alert('올바른 이메일 형식을 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // JWT 토큰 저장
        login();
        setActiveTab('마이페이지');
        navigate('/mypage');

      } else {
        const data = await response.json();
        alert(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>🔑 로그인</h1>

        {/* 이메일 입력 */}
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
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
            onChange={(e) => { setPassword(e.target.value) }}
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

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
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
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </div>
  )
}

export default LogIn;

function setActiveTab(arg0: string) {
  throw new Error("Function not implemented.");
}

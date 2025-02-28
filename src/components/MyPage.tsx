import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileEditModal from './ProfileEditModal';
import PasswordChangeModal from './PasswordChangeModal';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;


interface UserProfile {
  id: string;               // 6자리 랜덤 숫자
  email: string;            // 이메일
  password: string;         // 암호화된 비밀번호
  created_at: Date;         // 계정 생성 날짜
  region: string;           // 유저 접속 지역
  warning_count: number;    // 경고 누적 횟수
  last_login?: Date;        // 마지막 로그인 시간 (추천)
  is_verified: boolean;     // 이메일 인증 여부 (추천)
  role: string;             // 유저 역할 (일반, 관리자 등 - 추천)
  verification_token?: string; // 인증 토큰 (추천)
  nickname: string;         // 닉네임
  favoritePokemon: string;  // 가장 좋아하는 포켓몬
}

const MyPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  // 사용자 정보 불러오기
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token);
      if (!token) { // 토큰 만료됐을 경우 로그아웃 처리
        alert('다시 로그인이 필요합니다.');
        navigate('/login');
        logout();
        localStorage.removeItem('token');
        return
      };
      const response = await fetch(`${apiUrl}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('사용자 정보:', data);
        setUser(data);
      }
    } catch (error) {
      console.error('사용자 정보 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchUserProfile();
  }, [isLoggedIn]);

  return (
    <div style={{ padding: '20px' }}>
      {isLoggedIn ? (
        <div>
          <h1>마이페이지</h1>
          {user ? (
            <>
              <p>트레이너 id: {user.id}</p>
              <p>이메일: {user.email}</p>
              <p>닉네임: {user.nickname}</p>
              <p>가장 좋아하는 포켓몬: {user.favoritePokemon}</p>
              <button onClick={() => setProfileModalOpen(true)} style={buttonStyle}>프로필 수정</button>
              <button onClick={() => setPasswordModalOpen(true)} style={{ ...buttonStyle, marginLeft: '10px' }}>비밀번호 변경</button>
            </>
          ) : (
            <p>사용자 정보를 불러오는 중...</p>
          )}
        </div>
      ) : (
        <div>
          <h1>마이페이지</h1>
          <p>로그인 후 이용 가능합니다.</p>
        </div>
      )}
      {isProfileModalOpen && <ProfileEditModal user={user} onClose={() => setProfileModalOpen(false)} onSave={fetchUserProfile} />}
      {isPasswordModalOpen && <PasswordChangeModal onClose={() => setPasswordModalOpen(false)} />}
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#C084FC',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold'
};

export default MyPage;

function logout() {
  throw new Error('Function not implemented.');
}

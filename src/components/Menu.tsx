import React from 'react';
import { useTab } from '../context/TabContext';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Button = styled.button<{ $activetab?: boolean }>`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  background-color: ${props => (props.$activetab ? '#8C65FFFF' : '#C084FC')};
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

const Menu: React.FC = () => {
  const { activetab, setActiveTab } = useTab();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    navigate(path); // ✅ 클릭 시 바로 이동 (Link 지연 문제 해결)
  };

  const menuStyle: React.CSSProperties = {
    width: '16%',
    height: '90vh',
    backgroundColor: '#E9D5FF',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={menuStyle}>
      <nav>
        <Button $activetab={activetab === '경매장'} onClick={() => handleClick('경매장', '/')}>🌐 경매장</Button>
        <Button $activetab={activetab === '커뮤니티'} onClick={() => handleClick('커뮤니티', '/')}>🧑‍🧑‍🧒‍🧒 커뮤니티</Button>
        <Button $activetab={activetab === '배틀'} onClick={() => handleClick('배틀', '/')}>🆚 배틀</Button>
        <Button $activetab={activetab === '트레저타운'} onClick={() => handleClick('트레저타운', '/')}>🏘️ 트레저타운</Button>
        <Button $activetab={activetab === '프렌드에리어'} onClick={() => handleClick('프렌드에리어', '/')}>🎡 프렌드에리어</Button>
        <Button $activetab={activetab === '팀 선택'} onClick={() => handleClick('팀 선택', '/team-selection')}>⚔️ 팀 선택</Button>
        <Button $activetab={activetab === '탐험'} onClick={() => handleClick('탐험', '/')}>🗺️ 탐험</Button>
        <Button $activetab={activetab === '마이페이지'} onClick={() => handleClick('마이페이지', '/my-page')}>🧑‍💼 마이페이지</Button>

        {isLoggedIn ? (
          <Button onClick={logout}>🚪 로그아웃</Button>
        ) : (
          <>
            <Button $activetab={activetab === '로그인'} onClick={() => handleClick('로그인', '/login')}>🔑 로그인</Button>
            <Button $activetab={activetab === '회원가입'} onClick={() => handleClick('회원가입', '/signup')}>📝 회원가입</Button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Menu;
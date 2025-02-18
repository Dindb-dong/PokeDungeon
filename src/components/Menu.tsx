import React from 'react';
import { useTab } from '../context/TabContext';
import styled from 'styled-components';

interface ButtonProps {
  isActive: boolean;
}

const Button = styled.button<ButtonProps>`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  background-color: ${props => (props.isActive ? '#8C65FFFF' : '#C084FC')};  // 활성화 시 다른 배경색
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
`;

const Menu: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();
  const menuStyle: React.CSSProperties = {
    width: '16.666%',
    height: '90vh',
    backgroundColor: '#E9D5FF',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={menuStyle}>
      <Button isActive={activeTab === '경매장'} onClick={() => setActiveTab('경매장')}>🌐 경매장</Button>
      <Button isActive={activeTab === '커뮤니티'} onClick={() => setActiveTab('커뮤니티')}>🧑‍🧑‍🧒‍🧒 커뮤니티</Button>
      <Button isActive={activeTab === '배틀'} onClick={() => setActiveTab('배틀')}>🆚 배틀</Button>
      <Button isActive={activeTab === '트레저타운'} onClick={() => setActiveTab('트레저타운')}>🏘️ 트레저타운</Button>
      <Button isActive={activeTab === '프렌드에리어'} onClick={() => setActiveTab('프렌드에리어')}>🎡 프렌드에리어</Button>
      <Button isActive={activeTab === '팀 선택'} onClick={() => setActiveTab('팀 선택')}>🥊 팀 선택</Button>
      <Button isActive={activeTab === '탐험'} onClick={() => setActiveTab('탐험')}>🗺️ 탐험</Button>
    </div>
  );
};

export default Menu;
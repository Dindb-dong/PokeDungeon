import React from 'react';
import Menu from './components/Menu';
import DungeonScene from './scenes/DungeonScene';
import TeamSelectionScene from './scenes/TeamSelectionScene';
import { useTab } from './context/TabContext';
import MyPage from './components/MyPage';
import SignUp from './components/SignUp';

const App: React.FC = () => {

  const { activeTab, setActiveTab } = useTab();  // 이제 사용 가능!

  const renderScene = () => {
    switch (activeTab) {
      // case '경매장':
      //   return <AuctionScene />;
      // case '커뮤니티':
      //   return <CommunityScene />;
      // case '배틀':
      //   return <BattleScene />;
      case '팀 선택':
        return <TeamSelectionScene />;
      case '마이페이지':
        return <MyPage />;
      case '회원가입':
        return <SignUp />;
      default:
        return <DungeonScene />;
    }
  };

  const appStyle: React.CSSProperties = {
    display: 'flex',
    height: '90vh',
    width: '100%',
    backgroundColor: '#f3f4f6',  // bg-gray-100
  };

  return (
    <div style={appStyle}>
      <Menu />
      {renderScene()}  {/* activeTab에 따라 씬 변경 */}
    </div>
  );
};

export default App;
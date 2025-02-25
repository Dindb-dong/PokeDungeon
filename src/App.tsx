import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import DungeonScene from './scenes/DungeonScene';
import TeamSelectionScene from './scenes/TeamSelectionScene';
import MyPage from './components/MyPage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import VerifyEmail from './components/VerifyEmail';

const App: React.FC = () => {
  const appStyle: React.CSSProperties = {
    display: 'flex',
    height: '90vh',
    width: '100%',
    backgroundColor: '#f3f4f6',
  };

  return (
    <div style={appStyle}>
      <Menu />
      <Routes>
        <Route path="/" element={<DungeonScene />} />
        <Route path="/team-selection" element={<TeamSelectionScene />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />  {/* ✅ 추가 */}
      </Routes>
    </div>
  );
};

export default App;
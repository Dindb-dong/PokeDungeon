import React, { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

import { CSSProperties } from 'react';

const modalStyle: CSSProperties = {
  position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
};

const inputStyle: CSSProperties = {
  padding: '8px', width: '100%', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' as 'border-box'
};

const buttonStyle = {
  padding: '8px 16px', backgroundColor: '#C084FC', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px'
};

interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/user/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        alert('비밀번호가 변경되었습니다.');
        onClose();
      } else {
        const data = await response.json();
        console.log(data);
        alert(data.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  return (
    <div style={modalStyle}>
      <h2>비밀번호 변경</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>현재 비밀번호</label>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={inputStyle} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>새 비밀번호</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>새 비밀번호 확인</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
      </div>
      <button onClick={handleSubmit} style={buttonStyle}>저장</button>
      <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: '#FF4D4F', marginLeft: '10px' }}>취소</button>
    </div>
  );
};

export default PasswordChangeModal;
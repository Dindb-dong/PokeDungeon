import React, { useState } from 'react';
import { pokemonList } from '../../data/pokemonList';

const apiUrl = import.meta.env.VITE_API_URL;

interface ProfileEditModalProps {
  user: { nickname: string; favoritePokemon: string } | null;
  onClose: () => void;
  onSave: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, onClose, onSave }) => {
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [favoritePokemon, setFavoritePokemon] = useState(user?.favoritePokemon || '');
  const [search, setSearch] = useState(''); // 검색어 상태

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname, favoritePokemon }),
      });

      if (response.ok) {
        alert('프로필이 수정되었습니다!');
        onSave();
        onClose();
      } else {
        const data = await response.json();
        alert(data.message || '프로필 수정에 실패했습니다.');
      }
    } catch (error) {
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  return (
    <div style={modalStyle}>
      <h2>프로필 수정</h2>

      {/* 닉네임 입력 */}
      <div style={{ marginBottom: '10px' }}>
        <label>닉네임</label>
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} style={inputStyle} />
      </div>

      {/* 포켓몬 검색 및 선택 */}
      <div style={{ marginBottom: '20px' }}>
        <label>가장 좋아하는 포켓몬</label>
        <input
          type="text"
          placeholder="포켓몬 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, marginBottom: '5px' }}
        />
        <div style={dropdownStyle}>
          {filteredPokemonList.slice(0, 10).map((pokemon, index) => (
            <div
              key={index}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: favoritePokemon === pokemon ? '#C084FC' : '#fff',
                color: favoritePokemon === pokemon ? '#fff' : '#000',
                borderBottom: '1px solid #ccc',
              }}
              onClick={() => setFavoritePokemon(pokemon)}
            >
              {pokemon}
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <button onClick={handleSubmit} style={buttonStyle}>저장</button>
      <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: '#FF4D4F', marginLeft: '10px' }}>취소</button>
    </div>
  );
};

// 스타일
const modalStyle: React.CSSProperties = {
  position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
};

const inputStyle: React.CSSProperties = {
  padding: '8px', width: '100%', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box'
};

const dropdownStyle: React.CSSProperties = {
  maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff'
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px', backgroundColor: '#C084FC', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px'
};

export default ProfileEditModal;
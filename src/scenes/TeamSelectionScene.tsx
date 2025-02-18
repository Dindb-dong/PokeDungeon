import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TeamSelectionScene: React.FC = () => {
  const gameContainer = useRef<HTMLDivElement>(null);  // Phaser가 붙을 Ref

  useEffect(() => {
    if (gameContainer.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        physics: { default: 'arcade' },
        parent: gameContainer.current,  // Phaser 게임을 이 컨테이너에 마운트
        scene: {
          preload() { /* 에셋 로드 */ },
          create() { /* 게임 생성 */ },
          update() { /* 게임 업데이트 */ },
        },
      };

      const game = new Phaser.Game(config);
      return () => game.destroy(true);
    }
  }, []);

  return (
    <div style={{ flex: 5, height: '100%', padding: '10px', backgroundColor: '#E9D5FF' }}>
      <div ref={gameContainer} style={{ width: '100%', height: '100%' }} />  {/* Phaser 게임 출력 */}
    </div>
  );
};

export default TeamSelectionScene;
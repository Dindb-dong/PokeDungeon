import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const DungeonScene: React.FC = () => {
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
    <div style={{ flex: 5, height: '90%', padding: '10px', backgroundColor: '#E9D5FF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#D8B4FE', padding: '10px' }}>
        <div>팀 상태: 아이콘, 이름, 레벨, 체력, 상태이상, 지닌 도구</div>
        <div>로그: ~~에게 데미지를 입혔다! / ~~는 쓰러졌다! / ~~는 동료가 되기를 원한다!</div>
      </div>
      <div ref={gameContainer} style={{ width: '100%', height: '100%' }} />  {/* Phaser 게임 출력 */}
    </div>
  );
};

export default DungeonScene;
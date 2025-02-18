// main.ts
import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload(): void {
        // 에셋 로드
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    }

    create(): void {
        this.add.image(400, 300, 'sky');
        const emitter = this.add.particles(0, 0, 'flares', {
            frame: 'red',
            angle: { min: -30, max: 30 },
            speed: 150,
            scale: { start: 1, end: 0 },
            lifespan: 1000,
            blendMode: 'ADD',
        });
        const logo = this.physics.add.image(400, 100, 'logo');
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        logo.setVelocity(200, 200);
        emitter.startFollow(logo);
    }
}

// Phaser 게임 생성은 DungeonScene.tsx에서 관리
import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
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
        // 배경 추가
        this.add.image(400, 300, 'sky'); // 배경 추가

        // ParticleEmitter 생성
        const emitter = this.add.particles(0, 0, 'flares', {
            frame: 'red',
            angle: { min: -30, max: 30 },
            speed: 150,
            scale: { start: 1, end: 0 },
            lifespan: 1000,
            blendMode: 'ADD',
        });

        // 물리 엔진을 적용한 로고 추가 (중복 생성 방지)
        const logo = this.physics.add.image(400, 100, 'logo');
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        logo.setVelocity(200, 200);

        // 파티클의 위치를 로고에 맞춤
        emitter.startFollow(logo);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 200 },
        },
    },
};

const game = new Phaser.Game(config);
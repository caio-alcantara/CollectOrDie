class helpScene extends Phaser.Scene {
    constructor() {
        super({ key: 'helpScene' });
    }

    xButton;

    preload() {
        this.load.image('helpScene', 'assets/cenaHelp.png');
        this.load.image('xButton', 'assets/xButton.png');
    }

    create() {
        this.add.image(400, 300, 'helpScene');
        this.xButton = this.add.image(680, 100, 'xButton').setScale(0.1).setInteractive();
        this.xButton.on('pointerup', () => {
            this.scene.start('startScene');
        });
    }
}
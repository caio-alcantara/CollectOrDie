class startScene extends Phaser.Scene {
    constructor() {
        super({ key: 'startScene' });
    }

    ceu;
    chao;
    logo;
    start;
    help;
    blackRectangleBegin;
    blackRectangleStart;
    musica;

    preload() {
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('start', 'assets/startButton.png');
        this.load.image('help', 'assets/helpButton.png')
        this.load.audio('musica', 'assets/music.mp3');
    }

    create() {
        this.ceu = this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/4, 'ceu');    
        this.chao = this.add.image(400, 524, 'chao').setScale(1.1);
        this.logo = this.add.image(400, -300, 'logo').setScale(0.7);
        this.start = this.add.image(400, 400, 'start').setScale(0.8).setAlpha(0);
        this.help = this.add.image(400, 465, 'help').setScale(0.4).setAlpha(0);
        this.blackRectangleStart = this.add.rectangle(400, 300, 800, 600, 0x000000).setAlpha(0);

        if(gameState.hasBeenToStartScene == false){
            this.blackRectangleBegin = this.add.rectangle(400, 300, 800, 600, 0x000000);

            this.musica = this.sound.add('musica');
            this.musica.play();
            this.musica.loop = true;
            this.musica.setVolume(0.4);

            this.tweens.add({
                targets: this.blackRectangleBegin,
                alpha: 0,
                duration: 2500,
                ease: 'Power2'
            });

            this.tweens.add({
                targets: this.logo,
                y: 210,
                duration: 2500,
                ease: 'Power2'
            });

            this.time.addEvent({
                delay: 2500,
                callback: adicionaBotoes,
                callbackScope: this,
                loop: false
            });

            gameState.hasBeenToStartScene = true;

        } else {
            this.logo.y = 210;
            this.start.setAlpha(1);
            this.help.setAlpha(1);
        }

        this.help.setInteractive();
            this.help.on('pointerup', () => {
                this.scene.start('helpScene');
            });

        this.start.setInteractive();
            this.start.on('pointerup', () => {
                this.tweens.add({
                    targets: this.blackRectangleStart,
                    alpha: 1,
                    duration: 1200,
                    ease: 'Power2',
                    onComplete: () => {
                        this.scene.start('level1');
                    }
                });
            });
    }
}

function adicionaBotoes() {
    this.tweens.add({
        targets: this.start,
        alpha: 1,
        duration: 2500,
        ease: 'Power2'
    });

    this.tweens.add({
        targets: this.help,
        alpha: 1,
        duration: 2500,
        ease: 'Power2'
    });
}


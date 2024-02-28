class level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
    }

    ceu;
    chao;
    blackRectangleBegin;
    plataform1;
    plataform2;
    plataform3;
    plataform4;
    coin1;
    coin2;
    coin3;
    coin4;
    player;
    cursors;
    scoreText;
    currentTime;
    timeText;
    timer;

    preload() {
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.image('plataform1', 'assets/plataform1.png');
        this.load.image('plataform2', 'assets/plataform2.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.spritesheet('player', 'assets/playerSpritesheet.png', { frameWidth: 24, frameHeight: 32 });
    }

    create() {
        this.ceu = this.add.image(400, 300, 'ceu');
        this.chao = this.physics.add.staticGroup()
        this.chao.create(400, 580, 'chao');
    
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.currentTime = 30;
        this.timeText = this.add.text(10, 50, 'Time: 30', { fontSize: '32px', fill: '#000' });
        this.timeText.setText('Time: ' + this.currentTime + 's');
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        
        })

        this.cursors = this.input.keyboard.createCursorKeys();

        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [ { key: 'player', frame: 1 } ],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        this.criaPlataformas();
        this.criaPlayer();
        this.fadeIn();
    }

    

    update() {
        this.movimentaPlataformas();
        this.movimentaPlayer();
        this.coletaMoedas();

        if (this.currentTime === 0) {
            this.scene.start('endScene2');
        }
        if (this.coin1.coletada === true && this.coin2.coletada === true && this.coin3.coletada === true && this.coin4.coletada === true) {
            gameState.timePassed = 30 - this.currentTime;
            this.scene.start('level2');
        }
        
    }

    criaPlayer() {
        this.player = this.physics.add.sprite(50, 300, 'player').setScale(1.5);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.chao);
        this.physics.add.collider(this.player, this.plataform1);
        this.physics.add.collider(this.player, this.plataform2);
        this.physics.add.collider(this.player, this.plataform3);
        this.physics.add.collider(this.player, this.plataform4);
        
    }

    criaPlataformas() {
        this.coin1 = this.physics.add.image(320, 400, 'coin');
        this.coin2 = this.physics.add.image(400, 200, 'coin');
        this.coin3 = this.physics.add.image(650, 320, 'coin');
        this.coin4 = this.physics.add.image(600, 70, 'coin');
        this.plataform1 = this.physics.add.image(320, 430, 'plataform1').setImmovable(true);
        this.plataform2 = this.physics.add.image(400, 230, 'plataform1').setImmovable(true);
        this.plataform3 = this.physics.add.image(650, 350, 'plataform1').setImmovable(true);
        this.plataform4 = this.physics.add.image(600, 100, 'plataform2').setImmovable(true);
        this.plataform1.body.setAllowGravity(false);
        this.plataform2.body.setAllowGravity(false);
        this.plataform3.body.setAllowGravity(false);
        this.plataform4.body.setAllowGravity(false);
        this.coin1.body.setAllowGravity(false);
        this.coin2.body.setAllowGravity(false);
        this.coin3.body.setAllowGravity(false);
        this.coin4.body.setAllowGravity(false);
    }

    movimentaPlataformas() {
        if (this.plataform1.x === 100) {
            this.plataform1.ida = true;
        }
        if (this.plataform1.x === 700) {
            this.plataform1.ida = false;
        }
        if (this.plataform1.ida) {
            this.plataform1.x += 2;
            this.coin1.x += 2;
        } else {
            this.plataform1.x -= 2;
            this.coin1.x -= 2;
        }
    
        if (this.plataform2.x === 100) {
            this.plataform2.ida = true;
        }
        if (this.plataform2.x === 700) {
            this.plataform2.ida = false;
        }
        if (this.plataform2.ida) {
            this.plataform2.x += 4;
            this.coin2.x += 4;
        } else {
            this.plataform2.x -= 4;
            this.coin2.x -= 4;
        }
    
        if (this.plataform3.x === 100) {
            this.plataform3.ida = true;
        }
        if (this.plataform3.x === 700) {
            this.plataform3.ida = false;
        }
        if (this.plataform3.ida) {
            this.plataform3.x += 2;
            this.coin3.x += 2;
        } else {
            this.plataform3.x -= 2;
            this.coin3.x -= 2;
        }
    
        if (this.plataform4.x === 100) {
            this.plataform4.ida = true;
        }
        if (this.plataform4.x === 700) {
            this.plataform4.ida = false;
        }
        if (this.plataform4.ida) {
            this.plataform4.x += 5;
            this.coin4.x += 5;
        } else {
            this.plataform4.x -= 5;
            this.coin4.x -= 5;
        }
    
    }
    
    movimentaPlayer() {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
           this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        } else if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }
    }
    
    fadeIn() {
        this.blackRectangleBegin = this.add.rectangle(400, 300, 800, 600, 0x000000);
        this.tweens.add({
            targets: this.blackRectangleBegin,
            alpha: 0,
            duration: 2500,
            ease: 'Power2'
        });
    }

    coletaMoedas() {
        if (this.physics.overlap(this.player, this.coin1)) {
            gameState.score += Math.round(this.currentTime * 0.25);
            this.scoreText.setText('Score: ' + gameState.score);
            this.coin1.x = -300;
            this.coin1.body.setAllowGravity(true);
            this.coin1.coletada = true;
        }
        if (this.physics.overlap(this.player, this.coin2)) {
            gameState.score += Math.round(this.currentTime * 0.25);
            this.scoreText.setText('Score: ' + gameState.score);
            this.coin2.x = -300;
            this.coin2.body.setAllowGravity(true);
            this.coin2.coletada = true;
        }
        if (this.physics.overlap(this.player, this.coin3)) {
            gameState.score += Math.round(this.currentTime * 0.25);
            this.scoreText.setText('Score: ' + gameState.score);
            this.coin3.x = -300;
            this.coin3.body.setAllowGravity(true);
            this.coin3.coletada = true;
        }
        if (this.physics.overlap(this.player, this.coin4)) {
            gameState.score += Math.round(this.currentTime * 0.25);
            this.scoreText.setText('Score: ' + gameState.score);
            this.coin4.x = -300;
            this.coin4.body.setAllowGravity(true);
            this.coin4.coletada = true;
        }
    }

    updateTime() {
        if (this.currentTime != 0) {
            this.currentTime --;
            this.timeText.setText('Time: ' + this.currentTime + 's');
        } 
        
    }
}

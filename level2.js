
class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
    }

    ceu;
    chao;
    blackRectangleStart;
    blackRectangleBegin;
    plataform1;
    plataform2;
    plataform3;
    plataform4;
    plataform5;
    plataform6;
    plataform7;
    plataform8;
    player;
    coin1;
    coin2;
    coin3;
    coin4;
    coin5;
    coin6;
    bomb1;
    bomb2;
    bomb3;
    cursors;
    currentTime;
    timeText;
    timer;
    scoreText;

    preload() {
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.image('plataform1', 'assets/plataform1.png');
        this.load.image('plataform2', 'assets/plataform2.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet('player', 'assets/playerSpritesheet.png', { frameWidth: 24, frameHeight: 32 });
    }

    create() {
        this.ceu = this.add.image(400, 300, 'ceu');
        this.chao = this.physics.add.staticGroup()
        this.chao.create(400, 580, 'chao');
        this.scoreText = this.add.text(10, 10, `Score: ${gameState.score}`, { fontSize: '32px', fill: '#000' });
        this.blackRectangleStart = this.add.rectangle(400, 300, 800, 600, 0x000000).setAlpha(0);
        this.currentTime = 20;
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
        this.movimentaPlayer();
        this.movimentaPlataformas();
        this.coletaMoedas();
        this.colideBomba();
        if (this.currentTime === 0) {
            this.scene.start('endScene2');
        }
        if (this.coin1.coletada === true && this.coin2.coletada === true && this.coin3.coletada === true && this.coin4.coletada === true && this.coin5.coletada === true) {
            gameState.timePassed = 20 - this.currentTime;
            this.scene.start('endScene1')
        }
        
    }



    criaPlayer() {
        this.player = this.physics.add.sprite(50, 300, 'player').setScale(1.5);
       // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.chao);
        this.physics.add.collider(this.player, this.plataform1);
        this.physics.add.collider(this.player, this.plataform2);
        this.physics.add.collider(this.player, this.plataform3);
        this.physics.add.collider(this.player, this.plataform4);
        this.physics.add.collider(this.player, this.plataform5);
        this.physics.add.collider(this.player, this.plataform6);
        this.physics.add.collider(this.player, this.plataform7);
        this.physics.add.collider(this.player, this.plataform8);
    }

    criaPlataformas() {
        this.coin1 = this.physics.add.image(150, 90, 'coin');
        this.coin2 = this.physics.add.image(300, 270, 'coin');
        this.coin3 = this.physics.add.image(350, 420, 'coin');
        this.coin4 = this.physics.add.image(500, 350, 'coin');
        this.coin5 = this.physics.add.image(300, 60, 'coin');
        //this.coin6 = this.physics.add.image(700, 500, 'coin');
        this.bomb1 = this.physics.add.image(650, 170, 'bomb');
        this.bomb2 = this.physics.add.image(350, 150, 'bomb');
        this.bomb3 = this.physics.add.image(120, 220, 'bomb');
        this.plataform1 = this.physics.add.image(150, 120, 'plataform1').setImmovable(true).setScale(0.5);
        this.plataform2 = this.physics.add.image(300, 300, 'plataform1').setImmovable(true).setScale(0.5);
        this.plataform3 = this.physics.add.image(350, 450, 'plataform1').setImmovable(true).setScale(0.5);
        this.plataform4 = this.physics.add.image(500, 380, 'plataform1').setImmovable(true).setScale(0.5);
        this.plataform5 = this.physics.add.image(650, 200, 'plataform2').setImmovable(true).setScale(0.4);
        this.plataform6 = this.physics.add.image(350, 180, 'plataform2').setImmovable(true).setScale(0.4);
        //this.plataform7 = this.physics.add.image(450, 150, 'plataform2').setImmovable(true).setScale(0.4);
        this.plataform8 = this.physics.add.image(150, 250, 'plataform1').setImmovable(true).setScale(0.5);
        this.plataform1.body.setAllowGravity(false);
        this.plataform2.body.setAllowGravity(false);
        this.plataform3.body.setAllowGravity(false);
        this.plataform4.body.setAllowGravity(false);
        this.plataform5.body.setAllowGravity(false);
        this.plataform6.body.setAllowGravity(false);
       // this.plataform7.body.setAllowGravity(false); 
        this.plataform8.body.setAllowGravity(false);
        this.coin1.body.setAllowGravity(false);
        this.coin2.body.setAllowGravity(false);
        this.coin3.body.setAllowGravity(false);
        this.coin4.body.setAllowGravity(false);
        this.coin5.body.setAllowGravity(false);
        //this.coin6.body.setAllowGravity(false);
        this.bomb1.body.setAllowGravity(false);
        this.bomb2.body.setAllowGravity(false);
        this.bomb3.body.setAllowGravity(false);
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
            this.plataform4.x += 2;
            this.coin4.x += 2;
        } else {
            this.plataform4.x -= 2;
            this.coin4.x -= 2;
        }
/*
        if (this.plataform5.x === 100) {
            this.plataform5.ida = true;
        }
        if (this.plataform5.x === 700) {
            this.plataform5.ida = false;
        }
        if (this.plataform5.ida) {
            this.plataform5.x += 5;
            this.coin5.x += 5;
        } else {
            this.plataform5.x -= 5;
            this.coin5.x -= 5;
        }

        if (this.plataform6.x === 100) {
            this.plataform6.ida = true;
        }
        if (this.plataform6.x === 700) {
            this.plataform6.ida = false;
        }
        if (this.plataform6.ida) {
            this.plataform6.x += 5;
            //this.coin6.x += 5;
        } else {
            this.plataform6.x -= 5;
            //this.coin6.x -= 5;
        }

        if (this.plataform7.x === 100) {
            this.plataform5.ida = true;
        }
        if (this.plataform7.x === 700) {
            this.plataform5.ida = false;
        }
        if (this.plataform7.ida) {
            this.plataform7.x += 5;
            this.bomb1.x += 5;
        } else {
            this.plataform7.x -= 5;
            this.bomb1.x -= 5;
        }

        if (this.plataform8.x === 100) {
            this.plataform8.ida = true;
        }
        if (this.plataform8.x === 700) {
            this.plataform8.ida = false;
        }
        if (this.plataform8.ida) {
            this.plataform8.x += 5;
            this.bomb2.x += 5;
        } else {
            this.plataform8.x -= 5;
            this.bomb2.x -= 5;
        }
    */
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
        if (this.physics.overlap(this.player, this.coin5)) {
            gameState.score += Math.round(this.currentTime * 0.25);
            this.scoreText.setText('Score: ' + gameState.score);
            this.coin5.x = -300;
            this.coin5.body.setAllowGravity(true);
            this.coin5.coletada = true;
        }
    }

    colideBomba() {
        if (this.physics.overlap(this.player, this.bomb1) || this.physics.overlap(this.player, this.bomb2) || this.physics.overlap(this.player, this.bomb3)){
            this.physics.pause();
            this.player.setTint(0xff0000);

            this.tweens.add({
                targets: this.blackRectangleStart,
                alpha: 1,
                duration: 1200,
                ease: 'Power2',
                onComplete: () => {
                    this.scene.start('endScene2');
                }
            });
        }
    }

    updateTime() {
        if (this.currentTime != 0) {
            this.currentTime --;
            this.timeText.setText('Time: ' + this.currentTime + 's');
        } 
        
    }
}
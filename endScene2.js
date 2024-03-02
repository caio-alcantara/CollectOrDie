class endScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'endScene2' });
    }

    ceu;
    chao;
    gameOver;
    textoReiniciar;
    textoFinal;

    preload() {
        // Carrega as imgs
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.image('gameOver', 'assets/gameOver.png');
        this.input.on('pointerdown', () => {
            this.scene.start('startScene');
        });
    }

    create() {
        // Adiciona as imagens e textos na tela de fim de jogo 
        this.ceu = this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/4, 'ceu');    
        this.chao = this.add.image(400, 524, 'chao').setScale(1.1);
        this.gameOver = this.add.image(gameState.larguraJogo/2, 250, 'gameOver').setScale(1);
        this.textoReiniciar = this.add.text(125, 20, 'Clique na tela para reiniciar', { fontSize: '32px', fill: '#ffffff' });
        this.textoFinal = this.add.text(125, 380, 'Mais cuidado da próxima vez!', { fontSize: '32px', fill: '#ffffff' });
    }
}
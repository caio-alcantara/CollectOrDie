class endScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'endScene1' });
    }

    ceu;
    chao;
    congratulations;
    textoReiniciar;
    textoPontos;
    textoFinal;

    preload() {
        // Carrega as imgs
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.image('congratulations', 'assets/congratulations.png')
    }

    create() {
        // Adiciona as imagens
        // Adiciona os textos e pontuação na tela
        this.ceu = this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/4, 'ceu');    
        this.chao = this.add.image(400, 524, 'chao').setScale(1.1);
        this.congratulations = this.add.image(gameState.larguraJogo/2, 250, 'congratulations').setScale(0.8);
        this.textoReiniciar = this.add.text(125, 20, 'Clique na tela para reiniciar', { fontSize: '32px', fill: '#ffffff' });
        this.textoPontos = this.add.text(80, 325, `Você terminou em ${gameState.scoreAndTime[1]}s e fez ${gameState.scoreAndTime[0]} pontos`, { fontSize: '32px', fill: '#ffffff' });
        this.textoFinal = this.add.text(200, 400, 'Compita com seus amigos!', { fontSize: '32px', fill: '#ffffff' });

        // Adiciona um evento de clique na tela para reiniciar o jogo
        this.input.on('pointerdown', () => {
            this.scene.start('startScene');
        });

        
    }
}
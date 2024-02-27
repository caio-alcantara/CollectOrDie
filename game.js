 const gameState = {
    larguraJogo: 800,
    alturaJogo: 600,
    pontos: 0
}
 // Configuração básica do jogo
 const config = {
     type: Phaser.AUTO,
     width: gameState.larguraJogo,
     height: gameState.alturaJogo,

     physics: {
         default: 'arcade',
         arcade: {
             gravity: { y: 300 },
             debug: true
         }
     },

     scene: [startScene, level1, level2, endScene]
 };
 
 const game = new Phaser.Game(config);
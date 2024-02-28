 const gameState = {
    larguraJogo: 800,
    alturaJogo: 600,
    score: 0,
    hasBeenToStartScene: false,
    timePassed: 0
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

     scene: [startScene, helpScene, level1, level2, endScene1, endScene2]
 };

 const game = new Phaser.Game(config);
 // Armazena variáveis que poderão ser usadas em quaisquer cenas
 const gameState = {
    larguraJogo: 800,
    alturaJogo: 600,
    hasBeenToStartScene: false,
    scoreAndTime: [0, 0]
}
 // Configuração básica do jogo
 const config = {
     type: Phaser.AUTO,
     width: gameState.larguraJogo,
     height: gameState.alturaJogo,

     physics: {
         default: 'arcade',
         arcade: {
             gravity: { y: 300 }
         }
     },
     // O jogo contem 6 cenas
     scene: [startScene, helpScene, level1, level2, endScene1, endScene2]
 };
// Instancia o objeto do jogo
 const game = new Phaser.Game(config);
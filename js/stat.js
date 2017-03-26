window.renderStatistics = function(ctx, names, times) {
  // Определим значения
  var BALOON_X = 100;
  var BALOON_Y = 10;
  var BALOON_WIDTH = 420;
  var BALOON_HEIGHT = 270;
  // Тень под облачком
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(BALOON_X + 10, BALOON_Y + 10, BALOON_WIDTH, BALOON_HEIGHT);
  // Облачко
  ctx.fillStyle = 'white';
  ctx.fillRect(BALOON_X, BALOON_Y, BALOON_WIDTH, BALOON_HEIGHT);
  // Текст
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура, Вы победили!', BALOON_X + BALOON_WIDTH / 2, BALOON_Y + 10);
  ctx.fillText('Список результатов:', BALOON_X + BALOON_WIDTH / 2, BALOON_Y + 30);


}

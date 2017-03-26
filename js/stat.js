'use strict';

window.renderStatistics = function(ctx, names, times) {
  // Определим параметры
  var BALOON_X = 100; // Координата X начала облачка
  var BALOON_Y = 10;  // Координата Y начала облачка
  var BALOON_WIDTH = 420; // Ширина облачка
  var BALOON_HEIGHT = 270;// Высота облачка
  var COLUMN_WIDTH = 40; // Ширина колонки статистики
  var COLUMN_INDENT = 50; // Расстояние между колонками
  var HISTOGRAM_HEIGHT = 150; // Высота гистограммы

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

  // Колонки статистики
  // Найдём максимальное время
  for(var i = 0, maxTime = 0; i < times.length; i++) {
    if(maxTime < times[i]) {
      maxTime = times[i];
    }
  }
  var step = maxTime / (HISTOGRAM_HEIGHT - 40);

  for(i = 0; i < times.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillRect(BALOON_X, BALOON_Y + BALOON_HEIGHT - , BALOON_WIDTH, BALOON_HEIGHT);
}

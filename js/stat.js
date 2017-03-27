'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Определим параметры
  var BALOON_X = 100; // Координата X начала облачка
  var BALOON_Y = 10;  // Координата Y начала облачка
  var BALOON_WIDTH = 420; // Ширина облачка
  var BALOON_HEIGHT = 270;// Высота облачка
  var COLUMN_WIDTH = 40; // Ширина колонки статистики
  var COLUMN_INDENT = 50; // Расстояние между колонками
  var COLUMN_BOTTOM_SPACE = 40; // Отспут колонки от нижнего края облачка
  var COLUMN_LEFT_SPACE = 40; // Отспут колонки от левого края облачка
  var HISTOGRAM_HEIGHT = 150; // Высота гистограммы

  // Функция отрисовки облачка
  var drawBaloon = function (color, shift, stroke) {
    color = color || 'white';
    shift = shift || 0;
    var quadraticStep = 20; // Параметр величины скругления
    // Рисуем фигуру
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(BALOON_X + shift, BALOON_Y + quadraticStep + shift);
    ctx.quadraticCurveTo(BALOON_X + shift, BALOON_Y + shift, BALOON_X + quadraticStep + shift, BALOON_Y + shift);
    ctx.lineTo(BALOON_X + BALOON_WIDTH - quadraticStep + shift, BALOON_Y + shift);
    ctx.quadraticCurveTo(BALOON_X + BALOON_WIDTH + shift, BALOON_Y + shift, BALOON_X + BALOON_WIDTH + shift, BALOON_Y + quadraticStep + shift);
    ctx.lineTo(BALOON_X + BALOON_WIDTH + shift, BALOON_Y + BALOON_HEIGHT - quadraticStep + shift);
    ctx.quadraticCurveTo(BALOON_X + BALOON_WIDTH + shift, BALOON_Y + BALOON_HEIGHT + shift, BALOON_X + BALOON_WIDTH - quadraticStep + shift, BALOON_Y + +BALOON_HEIGHT + shift);
    ctx.lineTo(BALOON_X + quadraticStep + shift, BALOON_Y + BALOON_HEIGHT + shift);
    ctx.quadraticCurveTo(BALOON_X + shift, BALOON_Y + BALOON_HEIGHT + shift, BALOON_X + shift, BALOON_Y + BALOON_HEIGHT - quadraticStep + shift);
    ctx.lineTo(BALOON_X + shift, BALOON_Y + quadraticStep + shift);
    ctx.fill();
    if (stroke === true) {
      ctx.stroke();
    }
  };

  // Тень под облачком
  drawBaloon('rgba(0, 0, 0, 0.7)', 10, false);
  // Облачко
  drawBaloon('white', 0, true);

  // Текст
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура, Вы победили!', BALOON_X + BALOON_WIDTH / 2, BALOON_Y + 10);
  ctx.fillText('Список результатов:', BALOON_X + BALOON_WIDTH / 2, BALOON_Y + 30);

  // Колонки статистики
  // Найдём максимальное время
  for (var i = 0, maxTime = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }

  // Посчитаем, сколько можно отобразить миллисекунд на 1px гистограммы
  var step = Math.floor(maxTime / HISTOGRAM_HEIGHT);

  // Рисуем колонки и пишем текст
  ctx.textAlign = 'start';
  for (i = 0; i < times.length; i++) {

    // Высота текущей колонки
    var columnHeight = Math.floor(times[i] / step);

    // Посчитаем размеры и запомним для будущих вызовов
    var columnX = BALOON_X + COLUMN_LEFT_SPACE + i * (COLUMN_WIDTH + COLUMN_INDENT);
    var columnY = BALOON_Y + BALOON_HEIGHT - COLUMN_BOTTOM_SPACE;

    // Цвет колонки
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }

    // Рисуем колонку и подписи к ней
    ctx.fillRect(columnX, columnY - columnHeight, COLUMN_WIDTH, columnHeight);

    // Цвет текста
    ctx.fillStyle = 'black';

    // Пишем текст
    ctx.fillText(names[i], columnX, columnY + 10);
    ctx.fillText(Math.round(times[i]), columnX, columnY - columnHeight - 20);
  }
};

'use strict';

(function (window) {

  window.renderStatistics = function (ctx, names, times) {
    // Определим параметры
    var CLOUD_X = 100; // Координата X начала облачка
    var CLOUD_Y = 10;  // Координата Y начала облачка
    var CLOUD_WIDTH = 420; // Ширина облачка
    var CLOUD_HEIGHT = 270;// Высота облачка
    var COLUMN_WIDTH = 40; // Ширина колонки статистики
    var COLUMN_INDENT = 50; // Расстояние между колонками
    var COLUMN_BOTTOM_SPACE = 40; // Отспут колонки от нижнего края облачка
    var COLUMN_LEFT_SPACE = 40; // Отспут колонки от левого края облачка
    var HISTOGRAM_HEIGHT = 150; // Высота гистограммы
    var FONT_COLOR = 'black'; // Цвет текста в статистике

    // Нарисуем облачко с тенью
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    // Напишем заголовок
    writeText(ctx, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + 10, 'Ура, Вы победили!', FONT_COLOR, 'center');
    writeText(ctx, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + 30, 'Список результатов:', FONT_COLOR, 'center');

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
    for (i = 0; i < times.length; i++) {

      // Высота текущей колонки
      var columnHeight = Math.floor(times[i] / step);

      // Посчитаем размеры и запомним для будущих вызовов
      var columnX = CLOUD_X + COLUMN_LEFT_SPACE + i * (COLUMN_WIDTH + COLUMN_INDENT);
      var columnY = CLOUD_Y + CLOUD_HEIGHT - COLUMN_BOTTOM_SPACE;

      // Цвет колонки
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
      }

      // Рисуем колонку и подписи к ней
      ctx.fillRect(columnX, columnY - columnHeight, COLUMN_WIDTH, columnHeight);

      // Пишем текст
      writeText(ctx, columnX, columnY + 10, names[i]);
      writeText(ctx, columnX, columnY - columnHeight - 20, Math.round(times[i]));
    }
  };

  // Функция рисования облачка с тенью
  function renderCloud(ctx, x, y, width, height) {
    // Тень под облачком
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetY = 10;
    ctx.shadowOffsetX = 10;

    // Облачко
    var quadraticStep = 20; // Параметр величины скругления
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x, y + quadraticStep);
    ctx.quadraticCurveTo(x, y, x + quadraticStep, y);
    ctx.lineTo(x + width - quadraticStep, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + quadraticStep);
    ctx.lineTo(x + width, y + height - quadraticStep);
    ctx.quadraticCurveTo(x + width, y + height, x + width - quadraticStep, y + +height);
    ctx.lineTo(x + quadraticStep, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - quadraticStep);
    ctx.lineTo(x, y + quadraticStep);
    ctx.fill();

    // Тень убрать
    ctx.shadowColor = 'transparent';
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;

    // Добавим обводочку облачку
    ctx.stroke();
  }

  // Функция вывода текста
  function writeText(ctx, x, y, text, color, align) {
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.textAlign = align || 'start';
    ctx.fillStyle = color || 'black';
    text = text || '';
    ctx.fillText(text, x, y);
  }
}(window));

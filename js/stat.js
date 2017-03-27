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

    // Нарисуем облачко с тенью
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    // Текст
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Ура, Вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + 10);
    ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + 30);

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

      // Цвет текста
      ctx.fillStyle = 'black';

      // Пишем текст
      ctx.fillText(names[i], columnX, columnY + 10);
      ctx.fillText(Math.round(times[i]), columnX, columnY - columnHeight - 20);
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

}(window));

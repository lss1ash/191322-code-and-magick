'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setupDialog = document.querySelector('.setup');
  setupDialog.classList.remove('hidden');

  for (var i = 0, wizards = []; i < 4; i++) {
    wizards.push(createWizard());
  }

  function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function createWizard() {
    return {
      name: WIZARD_NAMES[getRandom(0, WIZARD_NAMES.length - 1)] + WIZARD_SURNAMES[getRandom(0, WIZARD_SURNAMES.length - 1)],
      coatColor: COAT_COLORS[getRandom(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandom(0, EYES_COLORS.length - 1)]
    };
  }
}());

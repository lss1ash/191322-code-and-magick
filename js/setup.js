'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setupDialog = document.querySelector('.setup');
  // setupDialog.classList.remove('hidden');

  var wizards = Array.apply(null, {length: 4}).map(function () {
    return createWizard();
  });

  var similarListElement = setupDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content;
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  similarListElement.appendChild(fragment);

  setupDialog.querySelector('.setup-similar').classList.remove('hidden');

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = setupDialog.querySelector('.setup-close');

  setupOpenIcon.setAttribute('tabindex', 0);

  setupOpen.addEventListener('click', openSetupDialog);
  setupOpenIcon.addEventListener('keydown', openSetupDialog);
  setupClose.addEventListener('click', closeSetupDialog);

  function openSetupDialog(event) {
    if (event.type === 'keydown') {
      if (event.keyCode !== 13) {
        return;
      }
    }
    setupDialog.classList.remove('hidden');
  }

  function closeSetupDialog() {
    setupDialog.classList.add('hidden');
  }

  function getRandomItem(items) {
    var min = 0;
    var max = items.length - 1;
    return items[Math.round(Math.random() * (max - min) + min)];
  }

  function createWizard() {
    return {
      name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(COAT_COLORS),
      eyesColor: getRandomItem(EYES_COLORS)
    };
  }

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }
}());

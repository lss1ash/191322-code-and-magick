'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  function getRandomItem(items) {
    var min = 0;
    var max = items.length - 1;
    return items[getRandomNumber(min, max)];
  }

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  var setupDialog = document.querySelector('.setup');
  var similarListElement = setupDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content;
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = setupDialog.querySelector('.setup-close');
  var setupSubmit = setupDialog.querySelector('.setup-submit');
  var setupUserName = setupDialog.querySelector('.setup-user-name');
  var wizardCoat = setupDialog.querySelector('.wizard-coat');
  var wizardEyes = setupDialog.querySelector('.wizard-eyes');
  var fireball = setupDialog.querySelector('.setup-fireball-wrap');

  var wizards = Array.apply(null, {length: 4}).map(function () {
    return createWizard();
  });

  var fragment = document.createDocumentFragment();
  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  similarListElement.appendChild(fragment);
  setupDialog.querySelector('.setup-similar').classList.remove('hidden');

  var mainWizard = {
    changeCoat: function () {
      wizardCoat.style.fill = getRandomItem(COAT_COLORS);
    },
    changeEyes: function () {
      wizardEyes.style.fill = getRandomItem(EYES_COLORS);
    },
    changeFireball: function () {
      fireball.style.backgroundColor = getRandomItem(FIREBALL_COLORS);
    },
    addEventListeners: function () {
      wizardCoat.addEventListener('click', this.changeCoat);
      wizardEyes.addEventListener('click', this.changeEyes);
      fireball.addEventListener('click', this.changeFireball);
    },
    removeEventListeners: function () {
      wizardCoat.removeEventListener('click', this.changeCoat);
      wizardEyes.removeEventListener('click', this.changeEyes);
      fireball.removeEventListener('click', this.changeFireball);
    }
  };

  addDialogEventListeners();

  function addDialogEventListeners() {
    setupOpen.addEventListener('click', openSetupDialog);
    setupOpenIcon.addEventListener('keydown', openSetupDialog);
    setupClose.addEventListener('click', closeSetupDialog);
    setupClose.addEventListener('keydown', closeSetupDialog);
    setupSubmit.addEventListener('click', closeSetupDialog);
    setupSubmit.addEventListener('keydown', closeSetupDialog);
    document.body.addEventListener('keydown', closeSetupDialog);
  }

  function openSetupDialog(event) {
    if (event.type === 'click' || event.type === 'keydown' && event.keyCode === KEYCODE_ENTER) {
      setupDialog.classList.remove('hidden');
      mainWizard.addEventListeners();
    }
  }

  function closeSetupDialog(event) {
    if (event.target === setupSubmit) {
      event.preventDefault();
      if (!setupUserName.validity.valid) {
        return;
      }
    }
    if (event.type === 'click') {
      setupDialog.classList.add('hidden');
      mainWizard.removeEventListeners();
    }
    if (event.type === 'keydown') {
      if (event.keyCode === KEYCODE_ESC && event.target !== setupUserName || event.keyCode === KEYCODE_ENTER && event.currentTarget !== document.body) {
        setupDialog.classList.add('hidden');
        mainWizard.removeEventListeners();
      }
    }
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

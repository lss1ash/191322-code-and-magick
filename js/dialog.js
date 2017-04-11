'use strict';

(function () {
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = window.mainWizardSetup.dialogNode.querySelector('.setup-close');
  var setupSubmit = window.mainWizardSetup.dialogNode.querySelector('.setup-submit');
  var setupUserName = window.mainWizardSetup.dialogNode.querySelector('.setup-user-name');

  var setupMainWizardDialog = {
    open: function (event) {
      if (event.type === 'click' || event.type === 'keydown' && event.keyCode === KEYCODE_ENTER) {
        window.mainWizardSetup.dialogNode.classList.remove('hidden');
        window.mainWizardSetup.addEventListeners();
        setupMainWizardDialog.removeOpenEventListeners();
        setupMainWizardDialog.addCloseEventListeners();
      }
    },
    close: function (event) {
      var escapeOrEnter = event.keyCode === KEYCODE_ESC && event.target !== setupUserName || event.keyCode === KEYCODE_ENTER && event.currentTarget !== document;
      if (event.type === 'click' || event.type === 'keydown' && escapeOrEnter) {
        if (event.target === setupSubmit) {
          event.preventDefault();
          if (!setupUserName.validity.valid) {
            return;
          }
        }
        window.mainWizardSetup.dialogNode.classList.add('hidden');
        window.mainWizardSetup.removeEventListeners();
        setupMainWizardDialog.removeCloseEventListeners();
        setupMainWizardDialog.addOpenEventListeners();
      }
    },
    addOpenEventListeners: function () {
      setupOpen.addEventListener('click', this.open);
      setupOpenIcon.addEventListener('keydown', this.open);
    },
    addCloseEventListeners: function () {
      setupClose.addEventListener('click', this.close);
      setupClose.addEventListener('keydown', this.close);
      setupSubmit.addEventListener('click', this.close);
      setupSubmit.addEventListener('keydown', this.close);
      document.addEventListener('keydown', this.close);
    },
    removeOpenEventListeners: function () {
      setupOpen.removeEventListener('click', this.open);
      setupOpenIcon.removeEventListener('keydown', this.open);
    },
    removeCloseEventListeners: function () {
      setupClose.removeEventListener('click', this.close);
      setupClose.removeEventListener('keydown', this.close);
      setupSubmit.removeEventListener('click', this.close);
      setupSubmit.removeEventListener('keydown', this.close);
      document.removeEventListener('keydown', this.close);
    }
  };

  setupMainWizardDialog.addOpenEventListeners();
})();

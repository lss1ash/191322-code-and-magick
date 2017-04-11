'use strict';

(function () {
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');

  var setupDialog = window.mainWizardSetup.dialogNode;
  var setupClose = setupDialog.querySelector('.setup-close');
  var setupSubmit = setupDialog.querySelector('.setup-submit');
  var setupUserName = setupDialog.querySelector('.setup-user-name');
  var setupUserPic = setupDialog.querySelector('.setup-user-pic');

  var setupMainWizardDialog = {
    open: function (e) {
      if (e.type === 'click' || e.type === 'keydown' && e.keyCode === KEYCODE_ENTER) {
        setupDialog.classList.remove('hidden');
        window.mainWizardSetup.addEventListeners();
        setupMainWizardDialog.removeOpenEventListeners();
        setupMainWizardDialog.addCloseEventListeners();
      }
    },
    close: function (e) {
      var escapeOrEnter = e.keyCode === KEYCODE_ESC && e.target !== setupUserName || e.keyCode === KEYCODE_ENTER && e.currentTarget !== document;
      if (e.type === 'click' || e.type === 'keydown' && escapeOrEnter) {
        if (e.target === setupSubmit) {
          e.preventDefault();
          if (!setupUserName.validity.valid) {
            return;
          }
        }
        setupDialog.classList.add('hidden');
        setupDialog.style.top = '100px';
        setupDialog.style.left = '50%';

        window.mainWizardSetup.removeEventListeners();
        setupMainWizardDialog.removeCloseEventListeners();
        setupMainWizardDialog.addOpenEventListeners();
      }
    },
    move: function (e) {
      e.preventDefault();

      var startCoords = {
        x: e.clientX,
        y: e.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
        setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    addOpenEventListeners: function () {
      setupOpen.addEventListener('click', this.open);
      setupOpenIcon.addEventListener('keydown', this.open);
    },
    addCloseEventListeners: function () {
      setupUserPic.addEventListener('mousedown', this.move);
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
      setupUserPic.removeEventListener('mousedown', this.move);
      setupClose.removeEventListener('click', this.close);
      setupClose.removeEventListener('keydown', this.close);
      setupSubmit.removeEventListener('click', this.close);
      setupSubmit.removeEventListener('keydown', this.close);
      document.removeEventListener('keydown', this.close);
    }
  };

  setupMainWizardDialog.addOpenEventListeners();
})();

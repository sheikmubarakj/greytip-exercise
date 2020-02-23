(function() {
  'use strict';

  angular
    .module('greyTip')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1582442504913;
    vm.showToastr = showToastr;

    vm.init = () => {
      vm.isViewSpeech = true;
      vm.speeches = [];
      let _localStorageItem = localStorage.getItem('speechList');
      if (_localStorageItem) {
        try {
          vm.speeches = JSON.parse(_localStorageItem);
        } catch (e) {
          console.log('Invalid localstorage item', e);
          localStorage.removeItem('speechList');
        }
      }  
    };

    vm.init();

    activate();

    vm.saveLocalDB = () => {
      localStorage.setItem('speechList', JSON.stringify(vm.speeches));
      // vm.init();
    };

    vm.selectSpeech = (speech) => {
      vm.selectedSpeech = speech;
    };

    vm.removeSpeech = (speech) => {
      if (!speech || !speech.id) return;
      vm.speeches.splice(vm.speeches.indexOf(speech), 1);
      vm.saveLocalDB();
      vm.reset();
    };

    vm.addSpeech = (newSpeech) => {
      if (newSpeech.id) {
        
      } else {
        newSpeech.id = vm.speeches.length + 1;
        vm.speeches.push(newSpeech);
      }

      
      vm.saveLocalDB();
      vm.reset();
    };



    vm.reset = () => {
      vm.selectedSpeech = {}
    };

    function activate() {
      getWebDevTec();
      
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();
      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
/*
1. form $dirty shoud be reset after save and delete
2. edited value should update in list
//Functionality
1. Button name - Create/Update
2. dont allow to create new one in my speech list
3. overall search


//Design
1. form allignment
2. active selected item

*/
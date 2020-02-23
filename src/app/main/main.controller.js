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

    vm.getClonedObject = (speech) => {
      return Object.assign({}, speech);
    };

    vm.init = () => {
      vm.isViewSpeech = true;
      vm.speeches = [];
      let _localStorageItem = localStorage.getItem('speechList');
      if (_localStorageItem) {
        try {
          vm.speeches = JSON.parse(_localStorageItem);
          vm.selectedSpeech = vm.getClonedObject(vm.speeches[0]);
        } catch (e) {
          console.log('Invalid localstorage item', e);
          localStorage.removeItem('speechList');
        }
      }  
    };

    vm.newSpeech = () => {
      vm.reset();
      vm.isViewSpeech = false;
      vm.selectedSpeech = {};
    };

    vm.mySpeech = () => {
      vm.reset();
      vm.isViewSpeech = true;
      vm.selectedSpeech = vm.getClonedObject(vm.speeches[0]);
    };

    vm.init();

    activate();

    vm.saveLocalDB = () => {
      localStorage.setItem('speechList', JSON.stringify(vm.speeches));
    };

    vm.selectSpeech = (speech) => {
      vm.selectedSpeech = vm.getClonedObject(speech);
    };

    vm.removeSpeech = (speech) => {
      if (!speech || !speech.id) return;
      let _index = vm.speeches.findIndex((item) => {
        return item.id === speech.id;
      })
      vm.speeches.splice(_index, 1);
      vm.saveLocalDB();
      vm.reset();
    };

    vm.addSpeech = (newSpeech) => {
      if (newSpeech.id) {
        let _speech = vm.speeches.find((item) => {
          return item.id === newSpeech.id;
        });
        _speech.description = newSpeech.description
        _speech.author = newSpeech.author
        _speech.subject = newSpeech.subject
        _speech.date = newSpeech.date;
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
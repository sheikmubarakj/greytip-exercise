(function() {
  'use strict';

  angular
    .module('greyTip')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

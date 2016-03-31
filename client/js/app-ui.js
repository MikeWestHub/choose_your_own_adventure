(function(adv) {
  'use strict';
    adv = adv || (window.adv = {});

    $('#login').on('submit', function( event ) {
        event.preventDefault();
        adv.tokenGen();
      });



})(window.adv);

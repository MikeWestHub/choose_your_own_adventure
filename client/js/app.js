(function(adv) {
  'use strict';
    adv = adv || (window.adv = {});

    // Call to server to generate a token
    adv.tokenGen = function tokenGen() {
      $.ajax({
        type: 'POST',
        url: '/login',
        contentType: 'application/json',
        success: function getNameAndToken(data) {
          console.log(data);
          // userAndToken.token = data.token;
        },
      });
    };



})(window.adv);

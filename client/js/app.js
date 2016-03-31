(function(adv) {
  'use strict';
    adv = adv || (window.adv = {});

    var token = {};

    // Call to server to generate a token
    adv.tokenGen = function tokenGen() {
      $.ajax({
        type: 'POST',
        url: '/login',
        contentType: 'application/json',
        success: function getToken(data) {
          console.log(data);
          token = data.token;
        },
      });
    };

    // Send the name of the new story to the server
    adv.createStoryName = function createStoryName() {
      $.ajax({
        type: 'POST',
        url: '/storyname',
        contentType: 'application/json',
        headers: {
            authorization: token
        },
        data: JSON.stringify({name: adv.storyName}),
        success: function getToken(data) {
          console.log(data);
          // userAndToken.token = data.token;
        },
      });
    };



})(window.adv);

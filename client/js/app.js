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

    // Send the body of the new step and its options to the server
    adv.createStep = function createStep() {
      $.ajax({
        type: 'POST',
        url: '/step',
        contentType: 'application/json',
        headers: {
            authorization: token
        },
        data: JSON.stringify({body: adv.stepText, optA: adv.optionAText, optB: adv.optionBText}),
        success: function getToken(data) {
          console.log(data);
          // userAndToken.token = data.token;
        },
      });
    };



})(window.adv);

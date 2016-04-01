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
        dataType: 'json',
        success: function getToken(data) {
          console.log(data);
          token.token = data.token;
          adv.displayNav();
          console.log(token);
          // adv.displayCreateStory();
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          // THIS NEEDS TO DO SOMETHING!
        },
      });
    };

    var storyAndID = [];

    // Grab the list of available stories from the server
    adv.listStories = function listStories() {
      $.ajax({
        type: 'GET',
        url: '/allstories',
        dataType: 'json',
        headers: {
            authorization: token
        },
        success: function getStories(data) {
          data.forEach(function(element) {
            storyAndID.id = element.id;
            storyAndID.name = element.name;
            console.log(storyAndID);
            // console.log(element.id);
          });
          console.log('success');
          // console.log(data);
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          console.log('failure :(');
          // console.log(status);
          // THIS NEEDS TO DO SOMETHING!
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
        success: function getStoryName(data) {
          console.log(data);
          adv.displayEditStory();
          // userAndToken.token = data.token;
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          // THIS NEEDS TO DO SOMETHING!
        },
      });
    };

    // Send the body of the new step and its options to the server
    adv.createStep = function createStep() {          //// Use argument and fill JSON with it
      $.ajax({
        type: 'POST',
        url: '/step',
        contentType: 'application/json',
        headers: {
            authorization: token
        },
        data: JSON.stringify({body: adv.stepText, optA: adv.optionAText, optB: adv.optionBText}),
        success: function getToken(data) {
          adv.appendStep();
          console.log(data);
          // userAndToken.token = data.token;
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          // THIS NEEDS TO DO SOMETHING!
        },
      });
    };



})(window.adv);

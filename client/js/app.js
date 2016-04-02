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

    adv.storyAndID = [];

    // Grab the list of available stories from the server
    adv.listStories = function listStories() {
      $.ajax({
        type: 'GET',
        url: '/stories',
        dataType: 'json',
        headers: {
            authorization: token
        },
        success: function getStories(data) {
          data.forEach(function(element) {
            adv.storyAndID.id = element.id;
            adv.storyAndID.name = element.name;
            console.log(adv.storyAndID);
            adv.appendStoryList();
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

    adv.storySteps = [];

    // Retrieve all steps for a story
    adv.getSteps = function getSteps() {
      $.ajax({
        type: 'GET',
        url: '/steps-in-a-story',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            authorization: token
        },
        success: function getStories(data) {
          data.forEach(function(element) {
            adv.storySteps.id = element.id;
            adv.storySteps.body = element.body;
            adv.storySteps.opt_a = element.opt_a;
            adv.storySteps.opt_b = element.opt_b;
            adv.storySteps.a_assignment = element.a_assignment;
            // adv.storySteps.b_assignment = element.b_assignment;
            console.log(adv.storySteps);


            adv.appendStep();
            $('.step-id').text(element.id);

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
        url: '/story',
        contentType: 'application/json',
        dataType: 'json',
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

    adv.storyStep = {};

    // Send the body of the new step and its options to the server
    adv.createStep = function createStep() {          //// Use argument and fill JSON with it
      $.ajax({
        type: 'POST',
        url: '/step',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            authorization: token
        },
        data: JSON.stringify({body: adv.stepText, opt_a: adv.optionAText, opt_b: adv.optionBText}),
        success: function getToken(data) {
            adv.storyStep.id = data.id;
            adv.storyStep.body = data.body;
            adv.storyStep.opt_a = data.opt_a;
            adv.storyStep.opt_b = data.opt_b;
            console.log(adv.storyStep);
            // console.log(element.id);

          adv.appendStep(adv.storyStep.body, adv.storyStep.opt_a, adv.storyStep.opt_b);
          // console.log(data);
          // adv.appendStepText(/*$('.new-step-text').val(), $('.new-step-option-a').text(), $('.new-step-option-b').text()*/);
          // userAndToken.token = data.token;
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          // THIS NEEDS TO DO SOMETHING!
        },
      });
    };

    // Sends step edits and option assignments to the server
    adv.editStep = function editStep() {          //// Use argument and fill JSON with it
      $.ajax({
        type: 'PATCH',
        url: '/update',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            authorization: token
        },
        data: JSON.stringify(
          {body: adv.stepText, opt_a: adv.optionAText, opt_b: adv.optionBText, a_assignment: $('.new-step-option-a-next').val(), b_assignment: 3}
        ),
        success: function getToken(data) {
          console.log(data);
          console.log($('.new-step-option-a-next').val());

        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          // THIS NEEDS TO DO SOMETHING!
        },
      });
    };


})(window.adv);

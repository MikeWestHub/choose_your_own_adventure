(function(adv) {
  'use strict';
    adv = adv || (window.adv = {});

    // Handler for login button to generate token.
    $('#login').on('submit', function( event ) {
        event.preventDefault();
        adv.tokenGen();
    });


    /************************************************
     *	FUNCTIONS HANDLING THE STORY NAME FORM  *****
     ************************************************/

    // Returns the value of the Story Name field.
    adv.storyName = function storyName() {
      return $('#new-story-name').val();
    };

    // Handler for submit on the Story Name field.
    $('#create-story').on('submit', function( event ) {
        event.preventDefault();
        adv.createStoryName();
        // console.log(42);
    });


    /************************************************
     *	FUNCTIONS HANDLING THE EDITING STORY FORM
     ************************************************/

    // Returns the value of the Step Text field.
    adv.stepText = function stepText(){
      return $('#new-step-text').val();
    };

    // Returns the value of the Option A field.
    adv.optionAText = function optionAText(){
      return $('#new-step-option-a').val();
    };

    // Returns the value of the Option B field.
    adv.optionBText = function optionBText(){
      return $('#new-step-option-b').val();
    };

    // Handler for submit on the Editing Story fields.
    $('#edit-story').on('submit', function( event ) {
        event.preventDefault();
        adv.createStep();
        // console.log(42);
    });




})(window.adv);

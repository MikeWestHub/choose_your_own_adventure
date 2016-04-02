(function(adv) {
  'use strict';
    adv = adv || (window.adv = {});

    /************************************************
     *********	FUNCTIONS HANDLING LOGIN  ***********
     ************************************************/

    // Handler for login button to generate token.
    $('#login').on('submit', function( event ) {
        event.preventDefault();
        adv.tokenGen();
    });

    // Displays the Nav after login.
    adv.displayNav = function displayNav(){
      $('#login').css('display', 'none');
      $('nav').css('display', 'block');
    };


    /************************************************
     *********	FUNCTIONS HANDLING NAV  *************
     ************************************************/

    // Displays available stories to edit after clicking on List Stories link.
    $('.list-stories').on('click', function() {
      adv.listStories();
      console.log("list me stories please");
    });

    // Appends HTML for available stories to edit.
    adv.appendStoryList = function appendStoryList() {
      $('#display-stories')
        .append( $('<li>').text(adv.storyAndID.name)
          .append( $('<a>').attr( {href: '#', class: 'edit-story'} ).text('Edit') )
        );
    };

    // Displays steps of a story when clicking on that story's edit link.
    $('#display-stories').on('click', '.edit-story', function() {
      adv.getSteps();
      // console.log("list me stories please");
    });

    // Displays the Create Story form after clicking on Create Story link.
    $('.create-story').on('click', function() {
      $('#login').css('display', 'none');
      $('#create-story').css('display', 'block');
    });


    /************************************************
     ***	FUNCTIONS HANDLING THE STORY NAME FORM  ***
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

    // Displays the Editing Story form after a Story name has been picked.
    adv.displayEditStory = function displayEditStory(){
      $('#create-story').css('display', 'none');
      $('#edit-story').css('display', 'block');
      $('.story-name').text($('#new-story-name').val());
    };


    /************************************************
     **	FUNCTIONS HANDLING THE EDITING STORY FORM ***
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
    $('.create-story-step').on('submit', function( event ) {
        event.preventDefault();
        adv.createStep();
        // console.log(42);
    });


    /************************************************
     ****	FUNCTIONS HANDLING EDITING THE STEPS  *****
     ************************************************/

     // Appends the HTML Elements for the most recently created step.
     adv.appendStep = function appendStep() {
       $('#edit-steps')
          .append( $('<li>')
            .append( $('<h4>').text('Step ID:')
              .append( $('<span>').attr( {class: 'step-id'} ) )
            )
            .append( $('<form>').attr('class', 'edit-story-step')
              .append( $('<input>').attr( {type: 'hidden', class: 'story-id', value: ''} ) )
              .append( $('<fieldset>')
                .append( $('<h4>').text('Step Text') )
                .append( $('<textarea>').attr( {class: 'new-step-text'} ) )
              )
              .append( $('<fieldset>')
                .append( $('<div>')
                  .append( $('<label>').attr( {for: 'new-step-option-a' } ).text('Option A Text') )
                  .append( $('<input>').attr( {type: 'text', class: 'new-step-option-a'} ) )
                )
                .append( $('<div>')
                  .append( $('<label>').attr( {for: 'new-step-option-a' } ).text('Option A Next Step') )
                  .append( $('<input>').attr( {type: 'text', class: 'new-step-option-a-next'} ) )
                )
              )
              .append( $('<fieldset>')
                .append( $('<div>')
                  .append( $('<label>').attr( {for: 'new-step-option-b' } ).text('Option B Text') )
                  .append( $('<input>').attr( {type: 'text', class: 'new-step-option-b'} ) )
                )
                .append( $('<div>')
                  .append( $('<label>').attr( {for: 'new-step-option-b' } ).text('Option B Next Step') )
                  .append( $('<input>').attr( {type: 'text', class: 'new-step-option-b-next'} ) )
                )
              )
              .append( $('<fieldset>')
                .append( $('<input>').attr( {type: 'submit', value: 'Update'} ) )
              )
            )
          );
     };

     // Sets the values of the inputs to edit an existing step
     adv.appendStepText = function appendStepText(/* newStepText, optionAText, optionBText */) {
      $('.step-id').text(adv.storyStep.id);
      $('.new-step-text').val(adv.storyStep.body);
      $('.new-step-option-a').val(adv.storyStep.opt_a);
      $('.new-step-option-b').val(adv.storyStep.opt_b);
     };

     // Sends updated step info to the server
     $('#edit-steps').on('submit', '.edit-story-step', function( event ) {
         event.preventDefault();
         if ( Number($('.new-step-option-a-next').val()) && Number($('.new-step-option-b-next').val()) ) {
           adv.editStep();
           console.log('Yay! Numbers!');
         } else {
           console.log('Boo! No Numbers!');
         }


     });



})(window.adv);

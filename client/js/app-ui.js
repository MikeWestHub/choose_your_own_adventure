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
      // $('#create-story').css('display', 'none');
      // $('#story-list').css('display', 'block');
    });

    // Appends HTML for available stories to edit.
    adv.appendStoryList = function appendStoryList() {
      $('#display-stories')
        .append( $('<li>').text(adv.storyAndID.name)
          .append( $('<div>').data( "name", adv.storyAndID.name)  // THIS SHOULD BE A FORM
            .append( $('<button>').attr( {class: 'edit-story', value: adv.storyAndID.id} ).text('Edit')
            )
          )

        );
    };

    // Displays steps of a story when clicking on that story's edit link.
    $('#display-stories').on('click', '.edit-story', function() {

      $.ajax({
        type: 'GET',
        url: '/steps-in-a-story', // will be adding '+ $(this).val(),' when server goes live
        contentType: 'application/json',
        dataType: 'json',
        context: this,
        headers: {
            authorization: adv.token
        },
        success: function grabSteps(data) {
          $('#edit-story').find('li').remove();
          data.forEach(function(element) {
            adv.storySteps.id = element.id;
            adv.storySteps.body = element.body;
            adv.storySteps.opt_a = element.opt_a;
            adv.storySteps.opt_b = element.opt_b;
            adv.storySteps.a_assignment = element.a_assignment;
            adv.storySteps.b_assignment = element.b_assignment;
            console.log(adv.storySteps);

            $('#edit-story').css('display', 'block');


            adv.appendStep(
              adv.storySteps.id,
              adv.storySteps.body,
              adv.storySteps.opt_a,
              adv.storySteps.opt_b,
              adv.storySteps.a_assignment,
              adv.storySteps.b_assignment
            );

          });
          console.log('success');
        },
        error: function handleErrors(xhr) {
          console.log( xhr );
          alert('Your request was not received. Please try again.');
        },
      });
      $('.story-name').text( $(this).closest('div').data( "name" ) );
      // $('.story-name').text($(this).val());
      // console.log("list me stories please");
    });

    // Displays the Create Story form after clicking on Create Story link.
    $('.create-story').on('click', function() {
      $('#login').css('display', 'none');
      $('#edit-story').css('display', 'none');
      $('#story-list').css('display', 'none');
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
        $('#edit-steps').find('li').remove();
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
     adv.appendStep = function appendStep(stepID, stepText, optionAText, optionBText, optionAPath, optionBPath) {
       $('#edit-steps')
          .append( $('<li>')
            .append( $('<h4>').text('Step ID:')
              .append( $('<span>').attr( {class: 'step-id'} ).text(stepID) )
            )
            .append( $('<form>').attr('class', 'edit-story-step')
              .append( $('<input>').attr( {type: 'hidden', class: 'story-id', value: ''} ) )
              .append( $('<fieldset>')
                .append( $('<h4>').text('Step Text') )
                .append( $('<textarea>').attr( {class: 'new-step-text'} ).val(stepText) )
                .append( $('<input>').attr( {type: 'checkbox', class: 'step-end', value: 'edit-btn'} ) )
                .append( $('<label>').text('This is a story endpoint') )
              )
              .append( $('<div>').attr( {class: 'option-options'} )
                .append( $('<fieldset>')
                  .append( $('<div>')
                    .append( $('<label>').attr( {for: 'new-step-option-a' } ).text('Option A Text') )
                    .append( $('<input>').attr( {type: 'text', class: 'new-step-option-a'} ).val(optionAText) )
                  )
                  .append( $('<div>')
                    .append( $('<label>').attr( {for: 'new-step-option-a' } ).text('Option A Next Step') )
                    .append( $('<input>').attr( {type: 'text', class: 'new-step-option-a-next'} ).val(optionAPath) )
                  )
                )
                .append( $('<fieldset>')
                  .append( $('<div>')
                    .append( $('<label>').attr( {for: 'new-step-option-b' } ).text('Option B Text') )
                    .append( $('<input>').attr( {type: 'text', class: 'new-step-option-b'} ).val(optionBText) )
                  )
                  .append( $('<div>')
                    .append( $('<label>').attr( {for: 'new-step-option-b' } ).text('Option B Next Step') )
                    .append( $('<input>').attr( {type: 'text', class: 'new-step-option-b-next'} ).val(optionBPath) )
                  )
                )
              )
              .append( $('<fieldset>')
                .append( $('<input>').attr( {type: 'submit', value: 'Update Step'} ) )
                .append( $('<input>').attr( {type: 'button', value: 'Delete Step', class: 'delete-btn'} ) )
              )
            )
          );
     };

     $('#edit-steps').on('click', '.step-end', function() {
       if ( $('.step-end').is(':checked') ) {
         console.log( $(this) );
         $(this).closest('li').find('.option-options').hide();
         $(this).closest('li').find('.new-step-option-a').val('');
         $(this).closest('li').find('.new-step-option-a-next').val('');
         $(this).closest('li').find('.new-step-option-b').val('');
         $(this).closest('li').find('.new-step-option-b-next').val('');
       }
       else {
         $(this).closest('li').find('.option-options').show();
       }


     });

     // Sends updated step info to the server
     $('#edit-steps').on('submit', '.edit-story-step', function( event ) {
         event.preventDefault();
         if ( Number( $('.new-step-option-a-next').val() ) && Number( $('.new-step-option-b-next').val() ) ) {
           adv.editStep();
           console.log('Yay! Numbers!');
         }
         else if ( $('.step-end').is(':checked') ) {
           adv.editStep();
         }
         else {
           alert("Please enter valid numbers for both of your Option's Next Steps.");
           console.log('Boo! No Numbers!');
         }
     });

     // Deleting a Step
     $('#edit-steps').on('click', '.delete-btn', function( event ) {
         event.preventDefault();
        $.ajax({
          type: 'DELETE',
          url: '/delete',
          contentType: 'application/json',
          dataType: 'json',
          headers: {
              authorization: adv.token
          },
          data: JSON.stringify( {id: $(this).closest('li').find('.step-id').text()} ),
          context: this,
          success: function removeStep(data) {
            console.log(data);
            console.log(this);
            $(this).closest('li').remove();

          },
          error: function handleErrors(xhr) {
            console.log( xhr );
            alert('Your request was not received. Please try again.');
          },
        });
     });

})(window.adv);

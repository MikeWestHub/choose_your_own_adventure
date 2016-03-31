(function(adv) {
  'use strict';
    adv = adv || (window.adv = {});

    // Returns the value of the Story Name field.
    adv.storyName = function storyName() {
      return $('#new-story-name').val();
    };

    // Handler for login button to generate token.
    $('#login').on('submit', function( event ) {
        event.preventDefault();
        adv.tokenGen();
      });

    // Handler for submit on the Story Name field.
    $('#create-story').on('submit', function( event ) {
        event.preventDefault();
        adv.createStoryName();
        // console.log(42);
      });



})(window.adv);

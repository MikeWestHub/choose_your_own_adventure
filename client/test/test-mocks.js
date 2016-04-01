
/**
 * This file mocks out Ajax calls by returning fake data from .json
 * files defined in the test/mocks directory
 *
 *  NOTE: All paths/methods/data in here is made up and incomplete
 *        You should update this file to document your API!
 */

/**
 * This `if` condition restricts the mocking to only happen when the
 * query string includes: debug
 * For example: going to localhost:8080?debug WILL enable mocking
 *              going to localhost:8080 WILL NOT enable mocking
 */
if (window.location.search.match(/[^a-z]debug([^a-z]|$)/i)) {

    // Login
    $.mockjax({
      url: '/login', // What should this be? Negotiate it!
      type: 'POST',             // This is the HTTP method for this action
      proxy: 'test/mocks/login.json'
    });

    // Create a new story
    $.mockjax({
      url: '/storyname', // What should this be? Negotiate it!
      type: 'POST',             // This is the HTTP method for this action
      proxy: 'test/mocks/new-story.json'
    });

    // Retrieve a story
    $.mockjax({
      url: '/list',
      type: 'GET',
      proxy: 'test/mocks/story.json'
    });

    // Retrieve all steps for a story
    $.mockjax({
      url: '/steps-in-a-story',
      type: 'GET',
      proxy: 'test/mocks/story-steps.json'
    });

    // Create a new step in a story
    $.mockjax({
      url: '/step',
      type: 'POST',
      proxy: 'test/mocks/new-step.json'
    });

    // Update a step in a story
    $.mockjax({
      url: '/step-update',
      type: 'PATCH',
      proxy: 'test/mocks/step-update.json'
    });

}

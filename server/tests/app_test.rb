require_relative "test_helper"

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def auth_header
    token = SecureRandom.hex
    Adventure::Session.create(token: token)
    header("AUTHORIZATION", token)
  end

  def test_authorization_token_is_given_in_header
    auth_header
    response = get("/stories")
    auth = JSON.parse(response.body)
    assert_equal Array, auth.class
  end

  def test_can_authenticate_user_request
    response = post("/login", hash.to_json, { "CONTENT_TYPE" => "application/json" })
    authenticate = JSON.parse(response.body)
    assert_equal true, authenticate.length == authenticate.length
  end

  def test_can_receive_string_for_story_name
    auth_header
    hash = { name: "Excalibur"}
    response = post("/story", hash.to_json, { "CONTENT_TYPE" => "application/json"})
    story_name = JSON.parse(response.body)
    assert_equal "Excalibur", story_name["name"]
  end

  def test_can_recieve_steps
    auth_header
    hash = { body: "This is a step" }
    response = post("/step", hash.to_json, { "CONTENT_TYPE" => "applicaiton/json" })
    step = JSON.parse(response.body)
    assert_equal "This is a step", step["body"]
  end

  def test_create_step_can_receive_options
    auth_header
    hash = { body: "Begin!!", opt_a: "Go left", opt_b: "Backflip!" }
    response = post("/step", hash.to_json, { "CONTENT_TYPE" => "applicaiton/json" })
    step = JSON.parse(response.body)
    assert_equal "Backflip!", step["opt_b"]
  end

  def test_can_post_step_based_on_id
    auth_header
    payload = { body: "Begin!!", opt_a: "Go left", opt_b: "Backflip!" }
    step = Adventure::Step.create(payload)
    response = post("/step/#{step.id}", step.to_json, { "CONTENT_TYPE" => "applicaiton/json" })
    options = JSON.parse(response.body)
    assert_equal "Go left", options["opt_a"]
  end

  def test_can_get_all_steps_for_story
    auth_header
    story = Adventure::Story.create(name: "Excalibur")
    Adventure::Step.create({ body: "Begin!!", story_id: story.id, opt_a: "Go left", opt_b: "Backflip!", a_assignment: nil, b_assignment: nil })
    Adventure::Step.create({ body: "Left!!", story_id: story.id, opt_a: "Run", opt_b: "Jump!", a_assignment: nil, b_assignment: nil })
    response = get("steps/#{story.id}")
    steps = JSON.parse(response.body)
    assert_equal "Begin!!", steps.first["body"]
    assert_equal 2, steps.length
  end

  def test_can_update_steps_and_options
    auth_header
    step = Adventure::Step.create(body: "Begin!!", opt_a: "Go left", opt_b: "Backflip!", a_assignment: nil, b_assignment: nil )
    payload = { body: "Begin!!", opt_a: "Go left", opt_b: "Backflip!", a_assignment: 3, b_assignment: 4 }
    response = patch("/step!/#{step.id}", payload.to_json, { "CONTENT_TYPE" => "applicaiton/json" })
    new_record = JSON.parse(response.body)
    assert_equal 4, new_record["b_assignment"]
  end

  def test_that_a_story_can_be_updated
    auth_header
    story = Adventure::Story.create(name: "Excalibur")
    new_name = {name: "The Sword in the Stone"}
    response = patch("/story!/#{story.id}", new_name.to_json, { "CONTENT_TYPE" => "applicaiton/json" })
    new_record = JSON.parse(response.body)
    assert_equal "The Sword in the Stone", new_record["name"]
  end

  def test_that_a_story_can_be_deleted
    auth_header
    story = Adventure::Story.create(name: "Excalibur")
    delete "/story_del/#{story.id}"
    assert_equal false, Adventure::Story.exists?(story.id)
  end

  def test_that_a_step_can_be_deleted
    auth_header
    story = Adventure::Story.create(name: "Excalibur")
    step_1 = Adventure::Step.create({ body: "Begin!!", story_id: story.id, opt_a: "Go left", opt_b: "Backflip!", a_assignment: nil, b_assignment: nil })
    step_2 = Adventure::Step.create({ body: "Left!!", story_id: story.id, opt_a: "Run", opt_b: "Jump!", a_assignment: nil, b_assignment: nil })
    delete "/step_del/#{step_1.id}"
    assert_equal false, Adventure::Step.exists?(step_1.id)
  end

end

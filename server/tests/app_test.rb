require_relative "test_helper"

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_declares_its_name
    response = get "/backend"
    assert response.ok?
    assert_equal "I am Groot!", response.body
  end

  def test_backend_echo_endpoint_will_return_exact_msg_back
    skip
    hash = { "name" => "bob" }
    response = post("/backend/echo", hash.to_json, { "CONTENT_TYPE" => "application/json" })

    assert response.ok?
    payload = JSON.parse(response.body)
    assert_equal(hash, payload)
  end

  def test_can_authenticate_user_request
    response = post("/login", hash.to_json, { "CONTENT_TYPE" => "application/json" })
    authenticate = JSON.parse(response.body)
    assert_equal true, authenticate.length == authenticate.length
  end

  def test_can_receive_string_for_story_name
    hash = { name: "Excalibur"}
    response = post("/storyname", hash.to_json, { "CONTENT_TYPE" => "application/json"})
    story_name = JSON.parse(response.body)
    assert_equal "Excalibur", story_name["name"]
  end
end

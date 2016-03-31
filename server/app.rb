ENV["RACK_ENV"] ||= 'development'

require "rubygems"
require "bundler/setup"
require "sinatra"
require "json"

require_relative "lib/adventure"

set :static, true
set :public_folder, Proc.new { File.join(root, "..", "client") }

before do
  content_type "application/json"
end

get "/backend" do
  "I am Groot!"
end
#
# post "/backend/echo" do
#   payload = JSON.parse(request.body.read)
#   payload.to_json
# end

get "/backend/steps" do
  Step.all.to_json
end

post "/login" do
  token = SecureRandom.hex
  session = Adventure::Session.create(token: token)
  session.to_json
end

post "/storyname" do
  payload = JSON.parse(request.body.read)
  story = Adventure::Story.create(payload)
  story.to_json
end

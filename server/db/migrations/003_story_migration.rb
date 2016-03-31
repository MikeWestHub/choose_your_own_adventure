class StoryMigration < ActiveRecord::Migration

  def change
    create_table :stories do |t|
      t.text :name
      t.timestamps null: false
    end
  end
end

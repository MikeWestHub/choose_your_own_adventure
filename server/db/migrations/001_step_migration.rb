class StepMigration < ActiveRecord::Migration

  def up
    drop_table :steps if table_exists?(:steps)
    create_table :steps do |t|
      t.text :body
      t.text :opt_a
      t.text :opt_b
      t.integer :a_assignment
      t.integer :b_assignment
      t.timestamps null: true
    end
  end

  def down
    drop_table :steps if table_exists?(:steps)
  end
end

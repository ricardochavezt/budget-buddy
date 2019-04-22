class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.decimal :amount
      t.references :category, foreign_key: true
      t.date :made_at
      t.string :comment

      t.timestamps
    end
  end
end

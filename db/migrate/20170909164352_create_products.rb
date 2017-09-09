class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.text :name
      t.decimal :price, :precision => 8, :scale => 2
      t.decimal :tax, :precision => 8, :scale => 2
      t.decimal :final_price, :precision => 8, :scale => 2
      t.decimal :dong
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

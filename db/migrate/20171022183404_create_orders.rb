class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.text :name
      t.text :link
      t.string :picture
      t.text :package_name
      t.text :customer_name
      t.decimal :price, :precision => 8, :scale => 2, default: 0

      t.timestamps
    end
    add_index :orders, :package_name
    add_index :orders, :name
  end
end

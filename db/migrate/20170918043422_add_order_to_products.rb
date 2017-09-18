class AddOrderToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :special_order, :boolean, default: false
    add_column :products, :remaining_quantity, :integer, default: 0
  end
end

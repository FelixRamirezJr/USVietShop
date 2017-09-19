class AddShipToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :shipping_price, :decimal, :precision => 8, :scale => 2, default: 0
    add_column :products, :weight, :decimal, default: 0
  end
end

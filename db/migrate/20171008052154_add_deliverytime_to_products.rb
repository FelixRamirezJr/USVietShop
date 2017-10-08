class AddDeliverytimeToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :delivery_time, :text
    add_column :products, :paid, :boolean, default: false
  end
end

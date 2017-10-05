class AddCustomerToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :customer_name, :text
    add_column :products, :customer_birthdate, :text
    add_column :products, :customer_phone_number, :text
  end
end

class AddPackageToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :package_name, :text
  end
end

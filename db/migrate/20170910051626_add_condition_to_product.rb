class AddConditionToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :condition, :text, default: "New"
  end
end

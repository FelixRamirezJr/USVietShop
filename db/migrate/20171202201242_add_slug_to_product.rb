class AddSlugToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :slug, :text
  end
  add_index :products, :slug
end

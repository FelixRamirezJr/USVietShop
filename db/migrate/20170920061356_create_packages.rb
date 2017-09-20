class CreatePackages < ActiveRecord::Migration[5.1]
  def change
    create_table :packages do |t|
      t.text :name
      t.references :product, foreign_key: true

      t.timestamps
    end
    add_index :packages, :name, unique: true
  end
end

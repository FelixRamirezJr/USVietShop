class CreateReceipts < ActiveRecord::Migration[5.1]
  def change
    create_table :receipts do |t|
      t.text :name
      t.text :date
      t.string :picture
      t.text :package_name
      t.decimal :total, :precision => 8, :scale => 2, default: 0

      t.timestamps
    end
    add_index :receipts, :package_name
    add_index :receipts, :name
  end
end

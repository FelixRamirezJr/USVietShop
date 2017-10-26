class CreateFinals < ActiveRecord::Migration[5.1]
  def change
    create_table :finals do |t|
      t.text :package_name
      t.decimal :money_received, :precision => 8, :scale => 2, default: 0
      t.decimal :deducted, :precision => 8, :scale => 2, default: 0

      t.timestamps
    end
    add_index :finals, :package_name
  end
end

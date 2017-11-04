# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171026192130) do

  create_table "finals", force: :cascade do |t|
    t.text "package_name"
    t.decimal "money_received", precision: 8, scale: 2, default: "0.0"
    t.decimal "deducted", precision: 8, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["package_name"], name: "index_finals_on_package_name"
  end

  create_table "orders", force: :cascade do |t|
    t.text "name"
    t.text "link"
    t.string "picture"
    t.text "package_name"
    t.text "customer_name"
    t.decimal "price", precision: 8, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_orders_on_name"
    t.index ["package_name"], name: "index_orders_on_package_name"
  end

  create_table "packages", force: :cascade do |t|
    t.text "name"
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_packages_on_name", unique: true
    t.index ["product_id"], name: "index_packages_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.text "name"
    t.decimal "price", precision: 8, scale: 2
    t.decimal "tax", precision: 8, scale: 2
    t.decimal "final_price", precision: 8, scale: 2
    t.decimal "dong"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "quantity", default: 1
    t.string "picture"
    t.decimal "sell_price", precision: 8, scale: 2
    t.text "condition", default: "New"
    t.boolean "sold", default: false
    t.text "description"
    t.boolean "special_order", default: false
    t.integer "remaining_quantity", default: 0
    t.decimal "shipping_price", precision: 8, scale: 2, default: "0.0"
    t.decimal "weight", default: "0.0"
    t.text "package_name"
    t.text "customer_name"
    t.text "customer_birthdate"
    t.text "customer_phone_number"
    t.text "delivery_time"
    t.boolean "paid", default: false
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "receipts", force: :cascade do |t|
    t.text "name"
    t.text "date"
    t.string "picture"
    t.text "package_name"
    t.decimal "total", precision: 8, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_receipts_on_name"
    t.index ["package_name"], name: "index_receipts_on_package_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

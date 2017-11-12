require 'csv'

class Product < ApplicationRecord
  include Copy
  belongs_to :user

  validates :name, presence: true
  validates :price, presence: true
  validates :sell_price, presence: true
  mount_uploader :picture, PictureUploader
  after_save :set_extras
  after_create :set_defaults

  if Rails.env.production?
    include PgSearch
    pg_search_scope :pg_simple,
                    :against => [:name, :price, :dong, :description,
                                 :customer_name, :customer_birthdate,
                                 :delivery_time, :customer_phone_number ],
                    :using => {
                      :tsearch => {:prefix => true}
                    }
  end

  def self.packages
    Product.order(created_at: :desc).pluck(:package_name).uniq
  end


  def self.send_to_inventory(pk_name = nil)
    return "Make sure to supply a valid package_name" if !packages.include?(pk_name)
    Copy.prepare_and_send(pk_name, USVietShop::Application::INVENTORY_URL + "create_from_copy")
  end

  def self.send_to_shop(pk_name = nil)
    return "Make sure to supply a valid package_name" if !packages.include?(pk_name)
    Copy.prepare_and_send(pk_name, USVietShop::Application::SHOP_URL + "create_from_copy")
  end

  def set_extras
    if self.dong.nil?
      self.update_column( :dong, (23500.00 * sell_price) )
    end
    if self.package_name
      self.update_column( :package_name, self.package_name.capitalize.strip )
    end
  end

  def set_defaults
    self.update_column(:remaining_quantity, self.quantity)
  end

  def self.to_csv(total = 0, sell_total = 0 )
    attributes = %w{name price sell_price description quantity shipping_price paid}

    CSV.generate(headers: true) do |csv|
      csv << attributes

      all.each do |pro|
        csv << attributes.map{ |attr| pro.send(attr) }
      end
      csv << [ "", total, sell_total ]
    end
  end


end

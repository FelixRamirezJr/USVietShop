class Product < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :price, presence: true
  validates :sell_price, presence: true
  mount_uploader :picture, PictureUploader
  after_save :set_dong
  after_create :set_defaults

  if Rails.env.production?
    include PgSearch
    pg_search_scope :pg_simple,
                    :against => [:name, :price, :dong, :description ],
                    :using => {
                      :tsearch => {:prefix => true}
                    }
  end

  def self.packages
    #Product.distinct.pluck(:package_name)
    Product.select("distinct name").pluck(:package_name).uniq.compact
  end

  def set_dong
    if self.dong.nil?
      self.update_column( :dong, (22726.00 * sell_price) )
    end
  end

  def set_defaults
    self.update_column(:remaining_quantity, self.quantity)
  end



end

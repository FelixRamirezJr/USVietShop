class Order < ApplicationRecord
  validates :name, presence: true
  validates :link, presence: true


  mount_uploader :picture, PictureUploader

  after_save :set_extras

  def self.packages
    #Product.distinct.pluck(:package_name)
    Order.select("distinct name").pluck(:package_name).uniq.reverse.compact
  end

  def set_extras
    if self.package_name
      self.update_column( :package_name, self.package_name.capitalize.strip )
    end
  end

end

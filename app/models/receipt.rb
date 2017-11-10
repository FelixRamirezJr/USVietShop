class Receipt < ApplicationRecord
  validates :name, presence: true
  validates :total, presence: true
  validates :picture, presence: true
  validates :package_name, presence: true

  mount_uploader :picture, PictureUploader

  after_save :set_extras

  def self.packages
    #Product.distinct.pluck(:package_name)
    Receipt.order(created_at: :desc).pluck(:package_name).uniq
  end

  def set_extras
    if self.package_name
      self.update_column( :package_name, self.package_name.capitalize.strip )
    end
  end

end

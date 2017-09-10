class Product < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :price, presence: true
  mount_uploader :picture, PictureUploader
  after_save :convert_to_dong

  if Rails.env.production?
    include PgSearch
    pg_search_scope :pg_simple,
                    :against => [:name, :price, :dong ],
                    :using => {
                      :tsearch => {:prefix => true}
                    }
  end

  def convert_to_dong
    self.update_column(:dong, (22726.00 * sell_price) )
  end



end

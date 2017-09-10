class Product < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :price, presence: true
  mount_uploader :picture, PictureUploader

  if Rails.env.production?
    include PgSearch
    pg_search_scope :pg_simple,
                    :against => [:name, :price, :dong ],
                    :using => {
                      :tsearch => {:prefix => true}
                    }
  end

end

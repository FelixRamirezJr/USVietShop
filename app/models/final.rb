class Final < ApplicationRecord
  after_save :set_extras

  validates :package_name, presence: true

  def set_extras
    if self.package_name
      self.update_column( :package_name, self.package_name.capitalize.strip )
    end
  end
end

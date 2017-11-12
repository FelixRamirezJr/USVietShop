require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module USVietShop
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    SHOP_URL = "https://us-viet-shop.herokuapp.com/"
    INVENTORY_URL = "https://us-viet-inventory.herokuapp.com/"
    ADMIN_EMAIL = "stella.hau.ramirez@gmail.com"
  end
end

class ProductsController < ApplicationController
  before_action :authenticate_user!

  def index
    @products = Product.all
  end

  def create
    @product = current_user.products.create( product_params )
    @product.save!
    redirect_to products_path
  end

  def new
    @product = Product.new
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :quantity, :picture)
  end

end

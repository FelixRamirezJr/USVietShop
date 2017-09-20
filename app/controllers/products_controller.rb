class ProductsController < ApplicationController
  before_action :authenticate_user!, except: [:show]

  def index
  end

  def show
    @product = Product.find( params[:id] )
  end

  def create
    @product = current_user.products.create( product_params )
    @product.save!
    redirect_to products_path
  end

  def new
    @product = Product.new
    @action = "Create"
  end

  def update
    @product = Product.find( params[:id] )
    @product.update_attributes( product_params )
    @product.save!
    redirect_to products_path
  end

  def edit
    @product = Product.find( params[:id] )
    @action = "Update"
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :quantity, :picture,
                                    :sell_price, :condition, :description,
                                    :dong, :special_order, :remaining_quantity,
                                    :shipping_price, :weight,
                                    :package_name )
  end

end

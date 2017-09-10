class ProductsController < ApplicationController
  before_action :authenticate_user!

  def index

    if params[:search] && !params[:search].empty?
      if Rails.env.production?
        @products = Product.pg_simple( params[:search] )
      else
        @products = Product.where( 'lower(name) like ?', params[:search] )
      end
    else
      @products = Product.all
    end

  end

  def create
    @product = current_user.products.create( product_params )
    @product.save!
    redirect_to products_path
  end

  def new
    @product = Product.new
  end

  def update
    @product = Product.find( params[:id] )
    @product.update_attributes( product_params )
    @product.save!
    redirect_to products_path
  end

  def edit
    @product = Product.find( params[:id] )
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :quantity, :picture, :sell_price, :condition)
  end

end

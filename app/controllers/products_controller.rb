class ProductsController < ApplicationController
  include ProductsHelper
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

  def print_csv
    @products = Product.where( package_name: params[:package] )
    product_calculations( @products )
    respond_to do |format|
      format.csv { send_data @products.to_csv( @price_total, @total ),
                   filename: "products-#{params[:package]}-#{Date.today}.csv" }
    end
  end

  private

  def product_params
    params.require(:product).permit(:name, :price, :quantity, :picture,
                                    :sell_price, :condition, :description,
                                    :dong, :special_order, :remaining_quantity,
                                    :shipping_price, :weight,
                                    :package_name, :customer_name, :customer_birthdate,
                                    :customer_phone_number, :delivery_time, :paid )
  end

end

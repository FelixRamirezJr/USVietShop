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

end

class ProductsController < ApplicationController
  include ProductsHelper
  include Devise::Controllers::Helpers
  before_action :authenticate_user!, except: [:show, :login_user]
  protect_from_forgery :except => [:login_user]


  def login_user
    value = params[:email].downcase
    if @user = User.where('lower(email) = ? OR lower(username) = ?', value, value).try(:first)
      sign_in @user
      redirect_to root_url
    else
      flash[:warning] = "Incorrect Email or Name"
      redirect_to request.referrer
    end
  end

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

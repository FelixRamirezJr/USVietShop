class OrdersController < ApplicationController
  include OrdersHelper
  before_action :selectedPackage, only: [:index]
  before_action :authenticate_user!


  def create
    @order = Order.create( order_params )
    @order.save!
    redirect_to orders_path
  end

  def new
    @order = Order.new
    @action = "Create"
  end

  def update
    @order = Order.find( params[:id] )
    @order.update_attributes( order_params )
    @order.save!
    redirect_to orders_path
  end

  def edit
    @order = Order.find( params[:id] )
    @action = "Update"
  end

  def destroy
    @order = Order.find( params[:id] )
    @order.destroy
    redirect_to request.referrer
  end

  def index
    @orders = Order.all
    order_calc
  end

  private
  def order_params
    params.require(:order).permit( :name, :link, :picture, :package_name,
                                     :price, :customer_name )
  end

  def renderOrders
    order_calc( @orders )
    render json: { Orders: @orders,
                   total: @total }
  end


  def selectedPackage
    #params[:package] = Order.packages.first if  params[:package].nil? || params[:package].empty?
  end

end

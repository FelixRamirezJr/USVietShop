class ReceiptsController < ApplicationController
  include ReceiptsHelper
  before_action :selectedPackage, only: [:index]
  before_action :authenticate_user!


  def create
    @receipt = Receipt.create( receipt_params )
    @receipt.save!
    redirect_to receipts_path
  end

  def new
    @receipt = Receipt.new
    @action = "Create"
  end

  def update
    @receipt = Receipt.find( params[:id] )
    @receipt.update_attributes( receipt_params )
    @receipt.save!
    redirect_to receipts_path
  end

  def edit
    @receipt = Receipt.find( params[:id] )
    @action = "Update"
  end

  def index
    @receipts = Receipt.where(package_name: params[:package])
    receipt_calc( @receipts )
  end



  private

  def receipt_params
    params.require(:receipt).permit( :name, :date, :picture, :package_name, :total )
  end

  def renderReceipts
    receipt_calc( @receipts )
    render json: { receipts: @receipts,
                   total: @total,
                   packages: Receipt.packages }
  end


  def selectedPackage
    params[:package] = Receipt.packages.first if  params[:package].nil? || params[:package].empty?
  end

end

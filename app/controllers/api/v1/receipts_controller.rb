module Api
  module V1
    class ReceiptsController < ApplicationController
      include ReceiptsHelper

      before_action :selectedPackage, only: [:index]

      respond_to :json


      def delete
        Receipt.find( params[:id] ).destroy
        render json: { success: "ok" }
      end

      def index
        @receipts = Receipt.where(package_name: params[:package])
        renderReceipts
      end

      # Renders Products VIA JSON Request
      def renderReceipts
        receipt_calc( @receipts )
        render json: { receipts: @receipts,
                       total: @total,
                       packages: Receipt.packages }
      end


      def selectedPackage
        params[:package] = Receipt.packages.first if params[:package].empty?
      end

    end
  end
end

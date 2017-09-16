module Api
  module V1
    class ProductsController < ApplicationController
      include ProductsHelper

      before_action :get_sold_param, only: [:index]

      respond_to :json

      def show
        @product = Product.find( params[:id] )
        render json: {product: @product}
      end

      def test
        render json: {test: "Yes"}
      end

      def sold
        @product = Product.find( params[:id] )
        @product.update_column(:sold, true )
        render json: { success: "ok" }
      end

      def get_sold
        @product = Product.where(sold: true)
        renderProducts
      end

      def delete
        Product.find( params[:id] ).destroy
        render json: { success: "ok" }
      end

      def index
        if params[:search] && !params[:search].empty?
          if Rails.env.production?
            @products = Product.pg_simple( params[:search] )
                               .where( sold: params[:sold] )
          else
            @products = Product.where( 'lower(name) like ?', params[:search] )
                               .where( sold: params[:sold] )
          end
        else
          @products = Product.where( sold: params[:sold] )
        end
        renderProducts
      end

      # Renders Products VIA JSON Request
      def renderProducts
        product_calculations( @products )
        render json: { products: @products, revenue: @revenue,
                       revenueDong: @revenueDong,
                       total: @total,
                       totalDong: @totalDong }
      end

      private

      def get_sold_param
        params[:sold] = true if params[:sold] == "true"
        params[:sold] = false if params[:sold] == "false"
      end

    end
  end
end

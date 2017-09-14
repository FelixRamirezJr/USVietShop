module Api
  module V1
    class ProductsController < ApplicationController
      include ProductsHelper

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
          else
            @products = Product.where( 'lower(name) like ?', params[:search] )
          end
        else
          @products = Product.all
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

    end
  end
end

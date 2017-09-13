module Api
  module V1
    class ProductsController < ApplicationController
      respond_to :json

      def test
        render json: {test: "Yes"}
      end

      def sold
        @product = Product.find( params[:id] )
        @product.update_column(:sold, true )
        render json: { success: "ok" }
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

        @total = @products.pluck(:sell_price).inject(0){|sum,x| sum + x }
        @revenue =  @total - @products.pluck(:price).inject(0){|sum,x| sum + x }
        @revenueDong = ( @revenue * 22726.00 )
        @totalDong = ( @total * 22726.00 )
        render json: { products: @products, revenue: @revenue,
                       revenueDong: @revenueDong,
                       total: @total,
                       totalDong: @totalDong }
      end

    end
  end
end

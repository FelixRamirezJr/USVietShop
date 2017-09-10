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
        render json: { products: @products }
      end

    end
  end
end

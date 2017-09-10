module Api
  module V1
    class ProductsController < ApplicationController
      respond_to :json

      def test
        render json: {test: "Yes"}
      end

      def index
        render json: { products: Product.all }
      end

    end
  end
end

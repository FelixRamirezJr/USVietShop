module Api
  module V1
    class ProductsController < ApplicationController
      include ProductsHelper

      before_action :get_bool_params, only: [:index]
      before_action :selectedPackage, only: [:index]
      #before_action :symbolize, only: [:create_from_copy]
      skip_before_action  :verify_authenticity_token

      respond_to :json

      def create_from_copy
        puts 'in create'
        puts params["product"]
        user = User.find_by_email(USVietShop::Application::ADMIN_EMAIL)
        product = user.products.new(JSON.parse(params["product"]))
        if product.save(validate: false)
          render json: {message: "Success"}
        else
          render json: {message: "Fail"}
        end
      end

      def show
        @product = Product.find( params[:id] )
        render json: {product: @product}
      end

      def test
        render json: {test: "Yes"}
      end

      def sold
        @product = Product.find( params[:id] )
        @product.update_columns(sold: true, remaining_quantity: 0)
        render json: { success: "ok" }
      end

      # This will toggle paid
      def toggle_paid
        @product = Product.find( params[:id] )
        @product.update_column(:paid, !@product.paid)
        @product.reload
        render json: { paid: @product.paid }
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
                               .where( package_name: params[:package] )
          else
            @products = Product.where( 'lower(name) like ?', params[:search] )
                               .where( sold: params[:sold] )
                               .where( package_name: params[:package] )
          end
        else
          @products = Product.where( sold: params[:sold] )
                             .where( package_name: params[:package] )
        end
        renderProducts
      end

      def sell_one
        @product = Product.find( params[:id] )
        if @product.remaining_quantity == 1
          @product.update_columns(sold: true, remaining_quantity: 0)
        else
          @product.update_columns( remaining_quantity: @product.remaining_quantity - 1 )
        end
        render json: { product: @product }
      end

      def add_one
        @product = Product.find( params[:id] )
        @product.update_columns(quantity: @product.quantity + 1,
                                remaining_quantity: @product.remaining_quantity + 1 )
        render json: { product: @product }
      end

      def set_final
        @final = Final.where(package_name: params[:package_name])
        if @final && @final.count > 0
          puts "FOUND IT"
          @final = @final.first
          @final.update_column(:money_received, params[:money_received])
        else
          puts "CRWETA"
          @final = Final.create(package_name: params[:package_name],
                                money_received: params[:money_received])
        end
        render json: {ok: "true"}
      end

      # Renders Products VIA JSON Request
      def renderProducts
        @final = Final.where(package_name: params[:package]).first
        product_calculations( @products, params )
        render json: { products: @products, revenue: @revenue,
                       revenueDong: @revenueDong,
                       total: @total,
                       totalDong: @totalDong,
                       shippingTotal: @shipping_total,
                       shippingTotalDong: @shipping_total_dong,
                       totalPaidForProducts: @totalPaidForProducts,
                       packages: Product.packages,
                       final: @final }
      end

      private

      def get_bool_params
        params[:sold] = to_bool( params[:sold] )
        params[:special_order] = to_bool( params[:special_order] )
      end

      def selectedPackage
        params[:package] = Product.packages.first if params[:package].empty?
      end

      def to_bool( myVal )
        return true if myVal == "true"
        return false if myVal == "false"
      end

      def symbolize
        puts "BEFORE symbolize is called"
        puts params.inspect
        params = params.symbolize_keys
        puts "After first symbol"
        puts params.inspect
        params[:product] = JSON.parse(params[:product]).symbolize_keys
        puts "After last symbil"
        puts params.inspect
      end

    end
  end
end

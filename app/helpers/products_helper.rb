module ProductsHelper

  def product_calculations( products, params = nil )

    @total = 0
    @revenue = 0
    @totalDong = 0
    price_total = 0
    @shipping_total = 0
    sell_price_total = 0

    products.each do |product|
      price_total = price_total + ( product.price * product.quantity )
      sell_price_total = sell_price_total + ( product.sell_price * product.quantity )
      @shipping_total =  @shipping_total + (product.shipping_price)
    end

    @price_total = price_total
    @total = sell_price_total
    @revenue =  sell_price_total - ( price_total + @shipping_total )
    @revenueDong = ( ( @revenue * 23500.00 ) )
    @totalDong = ( @total * 23500.00 )
    @shipping_total_dong = ( @shipping_total * 23500.00 )
    @totalPaidForProducts = ( @shipping_total + price_total )
  end

  def product_params
    params.require(:product).permit(:name, :price, :quantity, :picture,
                                    :sell_price, :condition, :description,
                                    :dong, :special_order, :remaining_quantity,
                                    :shipping_price, :weight,
                                    :package_name, :customer_name, :customer_birthdate,
                                    :customer_phone_number, :delivery_time, :paid, :remote_picture_url )
  end

end

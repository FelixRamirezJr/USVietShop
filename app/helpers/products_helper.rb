module ProductsHelper

  def product_calculations( products, params )

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

    @total = sell_price_total
    @revenue =  sell_price_total - ( price_total + @shipping_total )
    @revenueDong = ( ( @revenue * 23500.00 ) )
    @totalDong = ( @total * 23500.00 )
    @shipping_total_dong = ( @shipping_total * 23500.00 )
  end

end

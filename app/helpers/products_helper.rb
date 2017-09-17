module ProductsHelper

  def product_calculations(products)

    @total = 0
    @revenue = 0
    @totalDong = 0
    price_total = 0
    sell_price_total = 0

    products.each do |product|
      price_total = price_total + ( product.price * product.quantity )
      sell_price_total = sell_price_total + ( product.sell_price * product.quantity )
    end

    @total = sell_price_total
    @revenue =  sell_price_total - price_total
    @revenueDong = ( ( @revenue * 22726.00 ) )
    @totalDong = ( @total * 22726.00 )
  end

end

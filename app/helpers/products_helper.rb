module ProductsHelper

  def product_calculations(products)
    @total = products.pluck(:sell_price).inject(0){|sum,x| sum + x }
    @revenue =  @total - products.pluck(:price).inject(0){|sum,x| sum + x }
    @revenueDong = ( @revenue * 22726.00 )
    @totalDong = ( @total * 22726.00 )
  end
  
end

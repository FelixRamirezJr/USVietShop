module OrdersHelper

  def order_calc
    @total = @orders.sum(&:price)
  end

end

module ReceiptsHelper

  def receipt_calc( receipts )
    @total = @receipts.sum(&:total)
  end

end

module Copy
  module_function
  def post_api(url, params)
    uri = URI(url)
    req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
    req.body = params.to_json
    res = Net::HTTP.start(uri.hostname, uri.port) do |http|
      #http.request(req)
    end
    params
  end

  def send(pk_name, url)
    Product.where(package_name: pk_name).each do |pro|
       puts post_api(url, pro.attributes.except("id","picture","user_id").merge({"remote_picture_url" => pro.picture.url}))
     end
  end
end

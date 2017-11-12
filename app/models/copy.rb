module Copy
  module_function
  def post_api(api_url, params)
    puts "In post API with #{params}"
    puts "URL"
    puts api_url
    url = URI.parse(api_url)
    req = Net::HTTP::Post.new(url.request_uri, 'Content-Type' => 'application/json')
    req.set_form_data(params)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = (url.scheme == "https")
    response = http.request(req)
    puts response
  end

  def prepare_and_send(pk_name = nil, url = nil)
    Product.where(package_name: pk_name).each do |pro|
       puts post_api(url, pro.attributes.except("id","picture","user_id").merge({"remote_picture_url" => pro.picture.url}))
     end
  end
end

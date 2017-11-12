module Copy
  module_function
  def post_api(url, params)
    puts "In post API with #{params}"
    uri = URI(url)
    req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
    req.body = params.to_json
    puts "About to make res"
    res = Net::HTTP.start(uri.hostname, uri.port) do |http|
      http.request(req)
    end
    puts "end of res"
  end

  def prepare_and_send(pk_name = nil, url = nil)
    Product.where(package_name: pk_name).each do |pro|
       puts post_api(url, pro.attributes.except("id","picture","user_id").merge({"remote_picture_url" => pro.picture.url}))
     end
  end
end

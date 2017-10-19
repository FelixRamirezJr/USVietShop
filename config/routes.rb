Rails.application.routes.draw do

  # API Specific stuff
  namespace :api, defaults: {format: 'json'} do
      namespace :v1 do
        match '/test', to: "products#test", via: "GET"
        match '/products', to: "products#index", via: "GET"
        match '/sold', to: "products#sold", via: "GET"
        match '/delete', to: "products#delete", via: "GET"
        match '/get_sold', to: "products#get_sold", via: "GET"
        match '/product', to: "products#show", via: "GET"
        match '/sell_one', to: "products#sell_one", via: "GET"
        match '/add_one', to: "products#add_one", via: "GET"
      end
    end

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :products
  root "products#index"

  resources :receipts

end

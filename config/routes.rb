Rails.application.routes.draw do

  # API Specific stuff
  namespace :api, defaults: {format: 'json'} do
      namespace :v1 do
        match '/test', to: "products#test", via: "GET"
        match '/products', to: "products#index", via: "GET"
        match '/sold', to: "products#sold", via: "GET"
        match '/delete', to: "products#delete", via: "GET"
      end
    end

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :products
  root "products#index"
end

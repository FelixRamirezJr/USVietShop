Rails.application.routes.draw do

  # API Specific stuff
  namespace :api, defaults: {format: 'json'} do
      namespace :v1 do
        match '/test', to: "products#test", via: "GET"
      end
    end

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :products
  root "products#index"
end

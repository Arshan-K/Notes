Rails.application.routes.draw do
  # config/routes.rb
  namespace :api do
    namespace :v1 do
      post 'register', to: 'auth#register'
      post 'login', to: 'auth#login'

      resources :notes, only: [:index, :create, :show, :update, :destroy]
      get "/share/:id/:token", to: "notes#shared"
    end
  end
end

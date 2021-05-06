Rails.application.routes.draw do
  get 'lists/index'

  namespace :api do 
    namespace :v1 do 
     resources :lists, only: [:index, :create, :update, :destroy]
    end 
  end 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

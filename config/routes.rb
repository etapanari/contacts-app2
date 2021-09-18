Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do 
    resources :contacts, only: [:show, :index, :destroy, :update, :create]    
  end
  get '*path', to: 'pages#index', via: :all
end

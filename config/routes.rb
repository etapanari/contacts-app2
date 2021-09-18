Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do 
    resources :contacts    
  end
  get '*path', to: 'pages#index', via: :all
end

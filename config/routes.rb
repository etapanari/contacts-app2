Rails.application.routes.draw do
  
  root 'pages#index'

  namespace :api do

    namespace :v1 do
      resources :contacts, only: [:show, :index, :destroy, :update, :create] do
        member do
          get "changes", to: "contacts#changes"
        end
      end        
    end
    
    namespace :v2 do
      resources :contacts, only: [:show, :index, :destroy, :update, :create] do
        member do
          get "changes", to: "contacts#changes"
        end
      end        
    end

  end

  get '*path', to: 'pages#index', via: :all
end

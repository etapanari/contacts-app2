require 'active_model'

class ChangedContact
    include ActiveModel::Validations

    validates_presence_of :first_name, :last_name, :email, :phone_number, :timestamp

    attr_accessor :first_name, :last_name, :email, :phone_number, :timestamp
    def initialize(first_name, last_name, email, phone_number, timestamp)
        @first_name, @last_name, @email, @phone_number, @timestamp = first_name, last_name, email, phone_number, timestamp
    end
end
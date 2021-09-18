require 'active_model'

class ChangedContact
    include ActiveModel::Validations

    validates_presence_of :id, :first_name, :last_name, :email, :phone_number, :timestamp

    attr_accessor :id, :first_name, :last_name, :email, :phone_number, :timestamp
    def initialize(id, first_name, last_name, email, phone_number, timestamp)
        @id, @first_name, @last_name, @email, @phone_number, @timestamp = id, first_name, last_name, email, phone_number, timestamp
    end
end
class Contact < ApplicationRecord
    audited max_audits: 100
    validates :first_name, presence: true, length: {minimum: 2 , maximum: 100}
    validates :last_name, presence: true, length: {minimum: 2 , maximum: 100}
    validates :email, presence: true, email: true, length: {minimum: 2 , maximum: 50}
    validates :phone_number, numericality: true, presence: true, length: {minimum: 5 , maximum: 30}
    validates_uniqueness_of :email
end

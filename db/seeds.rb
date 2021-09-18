# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

contacts = Contact.create([
        {
            first_name: 'Electra', 
            last_name: 'Tapanari', 
            email: 'etapanari@gmail.com', 
            phone_number: '1235654'
        },
        {
            first_name: 'Edu', 
            last_name: 'Yubero', 
            email: 'edu@gmail.com', 
            phone_number: '1235654'
        },
        {
            first_name: 'Angelos', 
            last_name: 'Tapas', 
            email: 'angelino@gmail.com', 
            phone_number: '1235654'
        }
        
])
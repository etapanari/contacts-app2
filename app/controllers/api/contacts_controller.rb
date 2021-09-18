module Api
    class ContactsController < ApplicationController

        protect_from_forgery with: :null_session
        before_action :set_contact, only: [:show, :update, :destroy, :changes]    

        
        def changes               
            number_of_audits = @contact.audits.length
            @audits = @contact.audits.take(number_of_audits) 
    
            # @all_changes array will store all the hashes of each audit/edit.
            # The edits are stored in the audited_changes column of the audits table
            # as a hash with key being the column name(ie first_name) and value
            # being a list with 2 elements. list[0] holds the value before edit
            # and list[1] holds the value after edit. Special case is the
            # initial creation of the record. It is also stored in the audited_changes
            # column of the table but the value of the hash is a string.
            # I also add to the @changes hash the created_at key-value pair
            @all_changes = [] 
            (0..number_of_audits-1).each do | index |            
                @changes = @audits[index].audited_changes
                @changes["created_at"] = @audits[index].created_at
                @changes["id"] = @audits[index].id
                @all_changes.append(@changes)
            end

            # These instance variables are set from the view dynamicaly as the view 
            # iterates over the @changes hash and are used to display all fields of 
            # 'History of edits' in the contacts/id/changes route
            # This is done because the audits table only holds the editted fields 
            # while I want to display all fields (changed and unchanged)
            @current_first_name=""
            @current_last_name=""
            @current_email=""
            @current_phone_number=""
            @current_timestamp=""
            @current_id=""
            
            @contact_edited_array=[]

            @all_changes.each do |hash|
                hash.each do |key,value|
                    if not value.kind_of?(Array) 
                        if key=="first_name"
                            @current_first_name=value 
                        elsif key=="last_name" 
                            @current_last_name=value 
                        elsif key=="email" 
                            @current_email=value 
                        elsif key=="phone_number" 
                            @current_phone_number=value 
                        elsif key=="created_at" 
                            @current_timestamp=value
                        elsif key=="id"
                            @current_id = value                                 
                        end                                   
                    elsif value.length() ==2 
                        if key=="first_name" 
                            @current_first_name=value[1] 
                        elsif key=="last_name" 
                            @current_last_name=value[1] 
                        elsif key=="email" 
                            @current_email=value[1] 
                        elsif key=="phone_number" 
                            @current_phone_number=value[1] 
                        elsif key=="created_at" 
                            @current_timestamp=value     
                        elsif key=="id"
                            @current_id = value                                    
                        end
                    end
                end

                 
                @contact_edited = ChangedContact.new(@current_id, @current_first_name, @current_last_name, @current_email, @current_phone_number, @current_timestamp)
                @contact_edited_array.append(@contact_edited)                
            end

            if @all_changes.length > 0
                render json: ChangedContactSerializer.new(@contact_edited_array).serialized_json   
            else
                render json: {error: contact.errors.messages}, status: 422
            end

        end
    
        def show
            render json: ContactSerializer.new(@contact).serialized_json 
        end
    
        def index
            contacts = Contact.all 
            render json: ContactSerializer.new(contacts).serialized_json 
        end
    
  
        def create
            contact = Contact.new(contact_params)
            if contact.save 
                render json: ContactSerializer.new(contact).serialized_json             
            else
                render json: {error: contact.errors.messages}, status: 422
            end
        end
    
    
        def update
            if @contact.update(contact_params)                
                render json: ContactSerializer.new(@contact).serialized_json                
            else
                render json: {error: @contact.errors.messages}, status: 422
            end
        end
    
        def destroy

            if @contact.destroy
                head :no_content
            else
                render json: {error: @contact.errors.messages}, status: 422
            end
        end
    
        private
        def set_contact
            begin
                @contact = Contact.find(params[:id])
            rescue => e
                render json: {error: e}, status: 404
            end
        end
    
        def contact_params
            params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)        
        end
        
    end
end

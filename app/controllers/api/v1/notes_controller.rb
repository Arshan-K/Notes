class Api::V1::NotesController < ApplicationController
    before_action :authorize_request, except: [:shared]
    
    def index
        # Notes owned or shared
        notes = Note.left_joins(:shared_notes)
        .where("notes.user_id = ? OR shared_notes.user_id = ?", @current_user.id, @current_user.id)
        .distinct
        if notes.present?
            render json: notes, status: :ok
        else
            render json: { message: 'No notes found' }, status: :not_found
        end
    end
    
    def show
        notes = @current_user.notes.find_by(id: params[:id])
        
        if notes.present?
            render json: notes, status: :ok
        else
            render json: { message: 'No Note found' }, status: :not_found
        end
    end
    
    def create
        note = @current_user.notes.build(note_params)
        if note.save
            render json: note, status: :created
        else
            render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def shared
        note = Note.find_by(id: params[:id], share_token: params[:token])
        
        if note
            render json: note, status: :ok
        else
            render json: { error: "Not found" }, status: :not_found
        end
    end
    
    private
    def note_params
        params.permit(:title, :content)
    end
end

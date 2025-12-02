class ApplicationController < ActionController::API
    def authorize_request
        header = request.headers['Authorization']
        token = header.split(' ').last if header
        
        begin
            decoded = JsonWebToken.decode(token)
            @current_user = User.find(decoded[:user_id])
        rescue
            render json: { errors: 'Unauthorized' }, status: :unauthorized
        end
    end
end

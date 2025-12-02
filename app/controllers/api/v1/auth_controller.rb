class Api::V1::AuthController < ApplicationController
  wrap_parameters false
  # POST /api/v1/register
  def register
    user = User.new(user_params)
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/login
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user }, status: :ok
    else
      render json: { errors: [ "Invalid email or password" ] }, status: :unauthorized
    end
  end

  private
  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end

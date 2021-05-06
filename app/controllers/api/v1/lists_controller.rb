class Api::V1::ListsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    render json: List.all
  end

  def create
    list = List.create(list_params)
    render json: list
  end

  def update
    list = List.find(params[:id])
    list.update(list_params)
    render json: list
  end

  def destroy
    List.destroy(params[:id])
  end

  private
    def list_params
      params.require(:list).permit(:id, :title, :description)
    end
end
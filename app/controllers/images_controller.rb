class ImagesController < ApplicationController
  def index
    @images = Image.all
    @image = Image.new
  end

  def new
  end

  def create
    @image = Image.new(params[:image])
    if @image.save
      redirect_to images_path, notice: "That went swimmingly."
    else
      render 'index'
    end
  end

  def show
  end

  def edit
  end

  def destroy
  end
end

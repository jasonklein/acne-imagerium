class ImagesController < ApplicationController
  def index
    @images = Image.all
    @image = Image.new
  end

  def create
    @image = Image.new(params[:image])
    if @image.save
      redirect_to images_path, notice: success_notice
    else
      @images = Image.all
      @error_upload_type = params["upload type"]
      render 'index'
    end
  end

  def show
    @image = Image.find(params[:id])
  end

  def destroy
  end

  def success_notice
    ["That went swimmingly.", "Thanks for adding to the Imagerium!", "A great addition to the collection."].sample
  end
end

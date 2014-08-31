class ImagesController < ApplicationController
  def index
    @images = Image.all
    @image = Image.new
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def destroy
  end
end

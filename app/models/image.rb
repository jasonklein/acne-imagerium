class Image < ActiveRecord::Base
  attr_accessible :name, :content

  mount_uploader :content, ContentUploader
end

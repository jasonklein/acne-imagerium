class Image < ActiveRecord::Base
  attr_accessible :name, :content, :remote_content_url

  mount_uploader :content, ContentUploader
end

class Image < ActiveRecord::Base
  attr_accessible :name, :content, :remote_content_url

  mount_uploader :content, ContentUploader

  validates :name, presence: :true
  validate :local_or_remote_content

  def local_or_remote_content
    if remote_content_url.blank? && content.blank?
      errors.add(:base, "must include an image or image url")
    end
  end
end

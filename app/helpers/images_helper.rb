module ImagesHelper

  def upload_field(f, upload_type)
    case upload_type
    when "local"
      f.file_field :content
    when "remote"
      f.text_field :remote_content_url
    end
  end

  def form_errors_if_any(image)
    render partial: "form_errors", locals: {image: @image} if image.errors.any?
  end

end

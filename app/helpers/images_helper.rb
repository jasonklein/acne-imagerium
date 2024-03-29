module ImagesHelper

  def upload_field(f, upload_type)
    case upload_type
    when "local"
      render partial: "form_local", locals: {f: f}
    when "remote"
      render partial: "form_remote", locals: {f: f}
    end
  end

  def form_errors_if_any(image)
    render partial: "form_errors", locals: {image: @image} if image.errors.any?
  end

  def upload_form_name_value(image, error_upload_type, upload_type)
    if image.name && error_upload_type == upload_type
      image.name
    else
      ""
    end
  end

  def prev_image_button(id)
    image = Image.where("id < ?", id).last
    image ? render(partial: "arrow", locals: {image: image, direction: "prev"}) : return
  end

  def next_image_button(id)
    image = Image.where("id > ?", id).first
    image ? render(partial: "arrow", locals: {image: image, direction: "next"}) : return
  end

end

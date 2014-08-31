class RenameUrlToContentInImages < ActiveRecord::Migration
  def change
    rename_column :images, :url, :content
  end
end
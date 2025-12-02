class AddShareTokenToNotes < ActiveRecord::Migration[8.0]
  def change
    add_column :notes, :share_token, :string
  end
end

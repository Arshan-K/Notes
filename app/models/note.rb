class Note < ApplicationRecord
  belongs_to :user
  has_many :shared_notes
  has_many :shared_users, through: :shared_notes, source: :user

   before_create :generate_share_token

   private
   def generate_share_token
    self.share_token = SecureRandom.hex(10)
  end
end

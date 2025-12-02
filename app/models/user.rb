class User < ApplicationRecord
  has_secure_password
  has_many :notes
  has_many :shared_notes
end

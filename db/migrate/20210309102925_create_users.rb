class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :address
      t.string :zipcode
      t.string :city
      t.string :email
      t.string :username
      t.string :password
      t.boolean :active
      t.boolean :admin
      t.references :association, foreign_key: true
      t.timestamps
    end
  end
end

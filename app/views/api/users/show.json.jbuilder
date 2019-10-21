json.extract! @user, :id, :username, :first_name, :last_name, :location

if @user.profile_pic.attached?
  json.profile_pic url_for(@user.profile_pic)
end

json.items(@user.items_for_sale) do |item|
  json.extract! item, :id, :price, :sold

  json.photos(item.photos) do |photo|
    json.photoUrl url_for(photo)
  end
end

json.followers(@user.followers) do |follow|
  json.extract! follow, :id, :username
end

json.following(@user.followed_accounts) do |follow|
  json.extract! follow, :id, :username
end
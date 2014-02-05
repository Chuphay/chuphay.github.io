Nope. You must first pass through root to log into postgres. So you must do the following:
su -
su - postgres
createuser -s Application
exit
exit

Now try running your rake db:create, and you should be good to go

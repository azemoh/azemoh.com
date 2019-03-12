---
layout: post
title:  "Sinatra: Managing File Uploads"
date:   2016-05-17 20:00:00 +0100
  - sinatra
  - ruby
---

While building the [Movie Review app](/2016/04/30/movie-review-learn-sinatra-project.html), I wanted users to be able to upload movie posters along with the movies they submitted, and in the end display the images. I found is a Ruby gem called [paperclip](https://rubygems.org/gems/paperclip) but it only works with Rails, I also found another gem that allows you to use paperclip with rack-based apps. Finally I settled for the plain old Ruby [File](http://ruby-doc.org/core-2.2.0/File.html) class, because all I wanted was to be able to write image files to disk.


Lets define the upload form.

```html
<h1>Upload Image</h1>
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image">
  <input type="submit" value="Upload">
</form>
```

Here we have a form that posts to an `"upload"` route in our app when submitted. The important thing to note is the `"enctype"` attribute on the form element. This is required when form submissions include files.

Next we define our route and handle the file submission.

```ruby
post '/upload' do
  # Check if user uploaded a file
  if params[:image] && params[:image][:filename]
    filename = params[:image][:filename]
    file = params[:image][:tempfile]
    path = "./public/uploads/#{filename}"

    # Write file to disk
    File.open(path, 'wb') do |f|
      f.write(file.read)
    end
  end
end
```

We check to see if a file was submitted, then proceed to save the file in an "uploads" folder in our public directory.

Using the File class you can also delete a file like this.

```ruby
File.delete(path) if File.exist?(path)
```

### Resources
- [Ruby docs - File class](http://ruby-doc.org/core-2.2.0/File.html)
- [Form enctype Attribute](http://www.w3schools.com/tags/att_form_enctype.asp)

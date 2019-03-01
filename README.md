[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Stumblr. Web API

Stumblr. is a microblogging website created by [@macitege](https://github.com/macitege), [@rogerdunnhawaii](https://github.com/rogerdunnhawaii), [@MaxxKowalik](https://github.com/MaxxKowalik), and [@discocisco](https://github.com/discocisco). Anyone can view the website and read a collection of blogs made by great people, for great people. The back-end was developed using combination of Express.js, Mongoose, and MongoDB. The front-end was developed using JavaScript and jQuery commands to communicate with the Stumblr. API and display changes to the web application in real-time for the viewer. Anyone that views the application is able to read through any successfully created blog as well as the comments associated with that blog, if there are any comments to show. In order to create a blog or comment, users will have to create an account and then sign in. All accounts, blogs, and comments are stored within the API developed in the back-end.

- [View the API here!](https://stumblr-api.herokuapp.com)
- [View the client here!](https://hex-llc.github.io/stumblr-client)

## Technologies used

- Express.js
- Mongoose
- MongoDB
- Node.js
- NoSQL
- Git
- cURL
- client [(view the repo here.)](https://github.com/hex-llc/stumblr-client)

## Development process and strategy

The focus of the back-end of this project was to handle all users, blogs, and comments to be used by the client. Users were developed by GA to handle all proper authentification.
- Users were given an `email` and `username` to be used client-side for logging into the website or for displaying purposes. Each user could own multiple `blogs` or `comments` that could be related or unrelated.
- Blogs were given a `title`, `body`, and array of `comments` that would house multiple object instances of a `Comment` model. Blogs were also given an `owner` with reference back to the `User` who made the blog.
- Comments were given `text` and belonged to both a `Blog` and an 'owner' which in this case was an instance of `User`. In order for a comment to exist, a blog and owner must also exist simultaneously, elsewise the comment would be removed from the API.
- All blogs could be viewed by at once by any user, signed-in or not. User specific blogs could only be seen by the user who created those blogs.
- Ownership is required for any user to edit a specific resource.

## Add-ons for the future

- A new resource called `Profile` to house all user customization preferences and an array titled `Friends` which would reference other `User`s.
- A field within a resource or a new resource entirely with the purpose of housing all images used by the client.
- Authorization handled by a third-party login (i.e. Facebook or Google)

### Routes
- Blogs
  -Path: url/blogs
  -Methods: GET (find, populate, toObject, json)

  -Path: url/user-blogs
  -Method: GET (find, populate, toObject, json)
  -Require: Token

  -Path: url/blogs
  -Method: POST (create, json, toObject)
  -Require: Token

  -Path: url/blogs/id
  -Method: GET (findById, populate, json, toObject)
  -Require: Token

  -Path: url/blogs/id
  -Method: DELETE (findById, remove)
  -Require: Token

  -Path: url/blos/id
  -Method: PATCH (findById, update)
  -Require: TOKEN

- Comments
  -Path: url/comments
  -Methods: GET (find, populate, toObject, json)
  -Require: Token

  -Path: url/comments/id
  -Method: GET (find, populate, toObject, json)
  -Require: Token

  -Path: url/comments
  -Method: POST (create, json, toObject)
  -Require: Token

  -Path: url/comments/id
  -Method: PATCH (findById, populate, json, toObject)
  -Require: Token

  -Path: url/comments/id
  -Method: DELETE (findById, remove)
  -Require: Token

### ERD

1. [ ] [Link to ERD (Entity relationship diagram).](https://imgur.com/BDpvDy0)

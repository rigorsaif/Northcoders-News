# Checklist for Northcoders News - Front End

README

- [ ] specifies minimum versions
  - need to add minimum versions required to run app (e.g. npm version 5.x)
- [ ] `package.json` includes dependencies
  - you have dependencies that you have not listed in the readme, e.g. react-dom

UX

- [ ] Responsive design
- [ ] Items aligned
  - Topics drop down off center...
- [ ] Content legible (not too wide, obstructed, etc)
  - Background looks low quality
- [ ] Refreshing doesn’t cause an issue on sub-pages
  - getting a few errors in the console when I click around to get a topic, article, comments, post an incorect article/comment etc...

## Functionality
  - feels strange having the hover over the number of votes, when clicking it does nothing

- [ ] Can post an article
  - only for logged in user
- [ ] Users page

  - on `/articles/:topic` the article container looks very strange!

## Error Handling

- [ ] Error pages
- [ ] All errors handled
  - [ ] Navigation: (Bad url / Bad topic slug in url / Bad article id in url / Bad username in url)
  - [ ] Login: (Bad username / No username)
  - [ ] Post comment: (No text in comment body / Can you post without logging in?)
  - [ ] Post article: (No text in article body / No title / No topic selected / Can you post without logging in?)

## Code

    * Articles component is MASSIVE. could this be split up a bit? e.g. separate articlesList component

- [ ] prop-types
  - use prop-types!

  - _Comments & Delete Comment_ Should not need to fetchComments() again after delete, we could filter the comments in state to not include the deleted one
  - _handleVote_ sets state twice... why ?

STUDENTS SHOULD MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## EXTRA STUFF IF YOU HAVE TIME

- [ ] Add integration tests with `cypress`
- [ ] Make sure any code that can be extracted from components is extracted and tested with `Jest`
- [ ] Add logged in user to session / local storage
- [ ] Use `aXe` extension to check for a11y issues
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Add sorting functionality (make sure sort is not in render though)
- [ ] Add search functionality

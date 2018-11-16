# Checklist for Northcoders News - Front End

README

- [x] provides general info about app
- [x] clear instructions on how to run locally
- [x] link to API & back end repo
- [ ] specifies minimum versions
    * need to add minimum versions required to run app (e.g. npm version 5.x)
- [ ] `package.json` includes dependencies
    * you have dependencies that you have not listed in the readme, e.g. react-dom
- [x] deployed

UX

- [x] Basic styling added
- [ ] Responsive design
- [ ] Items aligned
    * Topics drop down off center...
- [ ] Content legible (not too wide, obstructed, etc)
    * Background looks low quality
- [ ] Refreshing doesn’t cause an issue on sub-pages
    * refresh goes back to login page. could use local storage to keep user logged in
- [ ] No errors in the console
    * getting a few errors in the console when I click around to get a topic, article, comments, post an incorect article/comment etc...
- [x] Login / Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

## Functionality

- [x] Some way to log in (should be very obvious to hiring partners)
- [ ] Some indication of who is logged in
    * can see who is logged in if I click on profile, would be good to see it without having to click on that
- [x] A way to log out
- [x] Serves all articles / top articles
- [x] Can vote on articles
- [x] Can vote a maximum of once in either direction per page load
- [x] Votes are persistent when page is refreshed
    * votes stay, but refresh requires user to login again
- [x] Topic pages load only relevant articles (especially when navigating from one topic page to another)
    * no indication (except the URL) as to which topic I am viewing articles for
- [x] Individual articles are served with comments
    * clicking on "comments" doesn't do anything, even though there is a hover effect
    * broken avatar links for comments
- [x] Can vote on comments
    * feels strange having the hover over the number of votes, when clicking it does nothing
- [x] New comments are persistent
- [x] Can only delete comments of logged in user
- [x] Deleted comments don’t re-appear on re-render/refresh
    * BUT have to login again
- [ ] Can post an article
    * article posted with no author, but when I refresh and login again, I can see the author
    * give the user some indication when they post an article or comment without a required field that the post has not been successful, e.g. red border / error message
- [x] User page
    * only for logged in user
- [ ] Users page

    * on `/articles/:topic` the article container looks very strange!

## Error Handling

- [ ] Error pages
    * '/articles/cats' only takes me to login page, when I login I then get a basic 'Not Found'
    * on the hosted version, you need to read the section regarding at the bottom of the page so that you can refresh without getting the netlify error page
- [ ] All errors handled
  - [ ] Navigation: (Bad url / Bad topic slug in url / Bad article id in url / Bad username in url)
  - [ ] Login: (Bad username / No username)
  - [ ] Post comment: (No text in comment body / Can you post without logging in?)
  - [ ] Post article: (No text in article body / No title / No topic selected / Can you post without logging in?)

## Code

- [x] Well named components
    * Articles component is MASSIVE. could this be split up a bit? e.g. separate articlesList component
- [x] Functional components used where possible
- [x] `node_modules` git ignored
- [x] Components reused where possible (`Articles` / `Voter`...)
- [x] Functions are DRY (`handleChange` for controlled components / api calls)
- [x] Uses object destructuring where possible
- [ ] prop-types
    * use prop-types!
- [ ] No `console.log`s / comments
    * `console.log("updated");` in Comments.jsx
    * use search in vscode to find comments and console.logs
    * unused variable `password` in `login()` function

    * _Comments & Delete Comment_ Should not need to fetchComments() again after delete, we could filter the comments in state to not include the deleted one
    * _handleVote_ sets state twice... why ?

STUDENTS SHOULD MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## EXTRA STUFF IF YOU HAVE TIME

- [ ] Add integration tests with `cypress`
- [ ] Make sure any code that can be extracted from components is extracted and tested with `Jest`
- [ ] Add logged in user to session / local storage
- [ ] Use `aXe` extension to check for a11y issues
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Add sorting functionality (make sure sort is not in render though)
- [ ] Add search functionality
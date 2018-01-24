
// Posts Masonry Prototype

var text
var submitButton
var masonry
var redo
var lastEntry = "Write your post."
var postBuffer = []
var font, fontB
var canv

function preload() {
      font = loadFont('assets/Karla/Karla-Regular.ttf')
      fontB = loadFont('assets/Karla/Karla-Bold.ttf')
}

function setup() {
  noCanvas()
  text = select('#textField')
  submitButton = select('#submit')
  redo = select('#repost')
  masonry = select('.masonry')

}

function addPost() {
  var content = text.value()
  if (content.length>0 && content != "undefined" && content != "Write your post.") {
    var newPost = createElement('div',content)
    newPost.addClass('item')
    newPost.parent(masonry)
    lastEntry = text.value()
    text.value("")
    postRef.push({"post":content})

    var postKeys = Object.keys(posts)
    var lastKey = postKeys[postKeys.length-1];
    postBuffer.push(lastKey)
  }
}

function rePost() {
  // HTML pag editing
  var oldPost = masonry.elt.lastChild
  oldPost.parentNode.removeChild(oldPost)
  text.value(lastEntry)
  //DB editing
  //postref[postBuffer[postBuffer.lenght]].set("")
}
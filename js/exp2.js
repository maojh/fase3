
// Posts Masonry Prototype

var input
var submitButton
var masonry
var redo
var lastEntry = "Write your post."
var postBuffer = []
var font, fontB
var canv

  input = document.getElementById("textField")
  submitButton = document.getElementById("submit")
  redo = document.getElementById("repost")
  masonry = document.getElementById("masonry")

function addPost() {
  var content = input.value
  if (content.length>0 && content != "undefined" && content != "Write your post.") {
    var newPost = createElement('div',content)
    newPost.addClass('item')
    newPost.parent(masonry)
    lastEntry = input.value
    input.value = ""
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
  input.value = lastEntry
  //DB editing
  //postref[postBuffer[postBuffer.lenght]].set("")
}

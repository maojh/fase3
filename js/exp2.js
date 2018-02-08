
// Posts Masonry

//todo: only one post per session, why?

var input
var submitButton
var masonry
var redo
var lastEntry = "Write your post."
var postBuffer = []
var font, fontB
var canv
var currPostNumber = 0
var allPost

  input = document.getElementById("textField")
  submitButton = document.getElementById("submit")
  redo = document.getElementById("repost")
  masonry = document.getElementById("masonry")
  //array of all the item (htmlCollection->array)
  allPost = Array.prototype.slice.call( document.getElementsByClassName("item"))

function addPost() {
  var content = input.value
  if (content.length>0 && content != "undefined") {

    //flush the old masonry
    masonry.innerHTML = ""

    //draw new post
    var newPost = document.createElement("div")
    newPost.innerText = content
    newPost.className = "item"
    newPost.id = (allPost.length).toString()
    masonry.appendChild(newPost)

    //re-draw every post with new one on top
    for(var post of allPost) {
      masonry.appendChild(post)
    }
    console.log(allPost.length);
    allPost.unshift(newPost)
    console.log(allPost);

    input.value = ""
    postRef.push({"post":content})

    var postKeys = Object.keys(posts)
    var lastKey = postKeys[postKeys.length-1];
    postBuffer.unshift(lastKey)
  }
  console.log(posts);
}


function rePost() {
  // HTML pag editing
  var oldPost = masonry.elt.lastChild
  oldPost.parentNode.removeChild(oldPost)
  input.value = lastEntry
  //DB editing
  //postref[postBuffer[postBuffer.lenght]].set("")
}

function showPosts() {
  // console.log(prevPosts);

  for(var content of prevPosts) {
    var newPost = document.createElement("div")
    newPost.innerText = content
    newPost.className = "item"
    newPost.id = (allPost.length).toString()
    masonry.appendChild(newPost)
  }

}

showPosts()

// function addPost() {
//   var content = input.value
//   if (content.length>0 && content != "undefined" && content != "Write your post.") {
//     var newPost = createElement('div',content)
//     newPost.addClass('item')
//     newPost.parent(masonry)
//     lastEntry = input.value
//     input.value = ""
//     postRef.push({"post":content})
//
//     var postKeys = Object.keys(posts)
//     var lastKey = postKeys[postKeys.length-1];
//     postBuffer.unshift(lastKey)
//   }
// }

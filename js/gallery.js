//exhibition gallery multi button
var exhibPic = document.getElementById("exhibPic")

var buttons = document.getElementsByClassName("dot")
var buttonsA = Array.prototype.slice.call( buttons )

function galleryNext(s) {
  for(var b of buttons) {
    if (b===s) {
      s.className = "dot dotSelected"
    } else {
      b.className = "dot"
    }
    var idpic = s.id.substring(1)
    exhibPic.src = "assets/exhib" + idpic + ".jpg"
  }
}

var imgA = document.getElementById("postA")
var srcA = imgA.src
// var indexA = srcA.match(/post\d+/i)[0].substring(4,5)
var indexA = srcA.match(/[A-Za-z0-9_-]+(\d)\.png/i)[1]
var imgB = document.getElementById("postB")
var srcB = imgB.src
// var indexB = srcB.match(/post\d+/i)[0].substring(4,5)
var indexB = srcB.match(/[A-Za-z0-9_-]+(\d)\.png/i)[1]

console.log("A ", indexA, ", B ", indexB );
function postPrev() {

  if (indexA<5) {
    indexA++
  } else {
    indexA = 1
  }
  if (indexB<5) {
    indexB++
  } else {
    indexB = 1
  }

  //replace me!
  srcA = "assets/posts/post" + indexA + ".png"
  imgA.src = srcA
  srcB = "assets/posts/post" + indexB + ".png"
  imgB.src = srcB

  console.log(indexA,indexB);
}

function postNext() {

  if (indexA>1) {
    indexA--
  } else {
    indexA = 5
  }
  if (indexB>1) {
    indexB--
  } else {
    indexB = 5
  }

  //replace me!
  srcA = "assets/posts/post" + indexA + ".png"
  imgA.src = srcA
  srcB = "assets/posts/post" + indexB + ".png"
  imgB.src = srcB

  console.log(indexA, indexB);
}

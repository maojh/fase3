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

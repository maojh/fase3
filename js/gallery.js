//exhibition gallery multi button
var exhibPic = document.getElementById("exhibPic")
var buttons = Array.prototype.slice.call( document.getElementsByClassName("dots"))


function selecteExhibPic(b) {
  for(var i=0; i<buttons.length; i++) {
    if(b==i) {
      b.className = "dot dotSelected"
    } else {
      b.className = "dot"
    }
    exhibPic.src = "assets/exhib" + b + ".jpg"
  }
}


// EXPERIMENT 1

//Pipes structure for building the interfacewith nested tokens objects
var pipes
//Current token - user interaction
var token
var rest = 1 //total token available per user (per each loading)
var blocked = false //block the interaction if token are all assigned
var userScores = [0,0,0,0,0,0]

//Firebase stuff
//Variables from dbSetup.js:
//scoresRef global various for pushing current user, totalRef for fetching and updating totals, totals is an array which contains the last values

//Container #exp1 for the generated canvas
var cont
var font

//Layout Variables
var smallScreen
var unit
var space
var gap

var marginY = 25
var marginX1, marginY1
var marginY2, marginX2
var size2, height2

function preload() {
  font = loadFont('assets/Lato/Lato-Regular.ttf')
}

function setup() {
  cont = select('#expRow')
  var exp1 = createCanvas(cont.width, cont.width * 0.6)
  pos = select('#exp1')
  exp1.parent(pos)


  smallCheck()

  unit = windowWidth / 100
  space = unit * 3
  gap = unit * 1.9
  marginY = 25
  marginX1 = unit / 4
  marginY1 = marginY * 4

  marginY2 = marginY - unit*1.5
  marginX2 = width / 3
  size2 = width *.66
  height2 = height * 0.75
  gapPipes = size2 / 17

  pipes = new Pipes()
  token = new Token()

  textSize(unit*1.5)
  textFont(font)
  noStroke()

  frameRate(5)
  // currToken = new CurrToken()
}


function draw() {
  background(240)

  if (rest==0) {
    blocked = true
  }

  if(blocked) {
    pipes.showTotals()
    // sendUserScores()
    noLoop()
  } else {
    // drawRest()
  }

  //Testo
  push()
  fill(15)
  text("Let's play. You have 10 chips.", marginX1, marginY)
  text("This is your basic income.", marginX1, marginY+gap)
  text("Each chip is worth 50 euros.", marginX1, marginY1)
  text("Place it where you believe", marginX1, marginY1+gap)
  text("you would spend your money!", marginX1, marginY1+gap*2)
  pop()


  //Pipes
  pipes.show()

  //Gettone
  token.show()

  // noLoop()
}

function mouseClicked() {
  token.isClicked()
}

function mouseDragged() {
  // token.moving = true
  // pipes.addOne()
}
function mouseReleased() {
  if (token.moving) {
    //check if one pipe have been clicked, in case add one score to the right pipe
    pipes.addOne()
  }
  token.moving = false
}

function Token() {
  this.moving = false
  this.size = unit * 8
  this.startPosY = 100+this.size+gap*3
  this.startPosX = marginX1 + this.size
  this.posY = this.startPosX
  this.posX = this.startPosY

  this.isClicked = function() {
    var distMouse = dist(mouseX, mouseY, this.posX, this.posY)
    if (distMouse<(token.size/2)) {
      this.moving = true
    } else {
      this.moving = false
    }
    return this.moving
  }

  this.show = function() {
    if(!blocked) {
      push()
        //Rest
        fill('yellow')
        ellipse(this.startPosX, this.startPosY, this.size, this.size)

        if(this.moving) {
          //Moving token
          this.posX = mouseX
          this.posY = mouseY
        } else {
          this.posX = this.startPosX
          this.posY = this.startPosY
        }

        fill('gold')
        ellipse(this.posX, this.posY, this.size*0.8, this.size*0.8)
      pop()
    }
  }
}

function Pipes() {
  this.currScores = userScores
  this.posXs = []

  this.addOne = function() {
    // token.moving = false
    for (var i = 0; i < this.posXs.length; i++) {
      var xpipe = this.posXs[i]

      if ((token.posY > marginY2) && (token.posY < marginY2+height2)) {
        if((token.posX > xpipe) && (token.posX < xpipe+gapPipes*2)) {
          console.log('pipe', i);
          console.log('rest', rest);
          userScores[i]++
          rest--
        }
      }
    }
    token.posX = token.startPosX
    token.posY = token.startPosY
  }

  this.show = function(){
    //temp userScores
    push()
      translate(marginX2,0,0)
      var pipeInd = 0
      for (var i = 0; i < 17; i+=3) {
        var currPosX = gapPipes*i
        this.posXs[pipeInd] = currPosX+marginX2
        fill(255)
        rect( currPosX, marginY2, gapPipes*2, height2)
        fill(0)
        rect( currPosX, marginY2+height2, gapPipes*2, unit)
        fill('yellow')
        noStroke()
        for (var j = 0; j < this.currScores[pipeInd]; j++) {
          rect( gapPipes*i, marginY2+height2-unit*(1+j)*1.2, gapPipes*2, unit)
          // console.log(i, j);
        }
        pipeInd++
      }
    pop()
  }
  this.showTotals = function() {
    //testo valori totali? grazie della partecipazione?
    this.currScores = totals
    this.show()
  }

}

//send value to firebase database
function sendUserScores() {
  var userScoresObj = {}
  userScoresObj['pipe1'] = userScores[0]
  userScoresObj['pipe2'] = userScores[1]
  userScoresObj['pipe3'] = userScores[2]
  userScoresObj['pipe4'] = userScores[3]
  userScoresObj['pipe5'] = userScores[4]
  userScoresObj['pipe6'] = userScores[5]
  scoresRef.push(userScoresObj)
}

//RESPONSIVE CANVAS

function windowResized() {
  cont = select('#expRow')
  resizeCanvas(cont.width, cont.width * 0.5);
  smallCheck()

  //Update layout variable to adapt the size of the elements
  unit = windowWidth / 100
  space = unit * 3
  gap = unit * 1.9
  marginY = 25
  marginX1 = unit / 4
  marginY1 = marginY * 4

  marginY2 = marginY - unit*1.5
  marginX2 = width / 3
  size2 = width *.66
  height2 = height * 0.75
  gapPipes = size2 / 17

  // textSize(unit*10)

  //Update the position of the current token
  // var initVal = unit*10

  console.log('res', cont.width);
}

function smallCheck() {
  if(windowWidth < 600) {
    smallScreen = false
    console.log('small');
    smallScreen = true
    resizeCanvas(cont.width, cont.width * 0.5);
  } else if (windowWidth > 600) {

  }
}

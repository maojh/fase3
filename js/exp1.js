

// EXPERIMENT 1

//Pipes structure for building the interfacewith nested tokens objects
var pipes
//Current token - user interaction
var token
var rest = 10 //total token available per user (per each loading)
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
  fontB = loadFont('assets/Lato/Lato-Bold.ttf')
}

function setup() {
  cont = select('#expRow')
  var exp1 = createCanvas(cont.width, cont.width * 0.5)
  pos = select('#exp1')
  exp1.parent(pos)

  smallCheck()

  unit = windowWidth / 100
  space = unit * 3
  gap = unit * 1.9
  marginY = 25
  marginX1 = unit / 4
  marginY1 = marginY * 3

  marginY2 = marginY - unit*1.5
  marginX2 = width / 3
  size2 = width *.66
  // height2 = height * 0.75
  height2 = height * 0.6
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
    sendUserScores()
    noLoop()
  } else {
    // drawRest()
  }

  //Testo
  push()
  fill(15)
  textSize(unit*1)
  text("Let's play. You have 10 chips.", marginX1, marginY)
  text("This is your basic income.", marginX1, marginY+gap*0.7)
  text("Each chip is worth 50 euros.", marginX1, marginY1)
  text("Place it where you believe", marginX1, marginY1+gap*.7)
  text("you would spend your money!", marginX1, marginY1+gap*2*.7)
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
  token.moving = true
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
  this.startPosY = 100+this.size+gap*2
  this.startPosX = marginX1 + this.size/1.5
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

      var instH = this.startPosY-this.size/1.6
      textSize(unit*1.2)
      text("Drag and drop it easily!", marginX1, instH)
      strokeCap(0)

      //Rest
      fill('#fcd448')
      ellipse(this.startPosX, this.startPosY, this.size, this.size)

      if(this.moving) {
        //Moving token
        this.posX = mouseX
        this.posY = mouseY
      } else {
        this.posX = this.startPosX
        this.posY = this.startPosY
      }

      fill('#fdc502')
      ellipse(this.posX, this.posY, this.size*0.8, this.size*0.8)
      fill(0)
      text(rest, this.startPosX-unit/2, this.startPosY+unit/2)
    } else {
      fill(0)
      textSize(unit)
      text("Thank you!", marginX1+unit, this.startPosY)
      text("That's the current data.", marginX1+unit, this.startPosY+unit*2)
    }
    pop()
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
          // console.log('pipe', i);
          // console.log('rest', rest);
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
    //17 is npipes*2+npipes-1
    for (var i = 0; i < 17; i+=3) {
      var currPosX = gapPipes*i
      this.posXs[pipeInd] = currPosX+marginX2
      fill(255)
      stroke(0)
      rect( currPosX, marginY2, gapPipes*2, height2)
      fill(0)
      rect( currPosX, marginY2+height2, gapPipes*2, unit)
      fill('#fdc502')
      noStroke()
      for (var j = 0; j < this.currScores[pipeInd]; j++) {
        if(blocked) {
          rect( gapPipes*i+1, marginY2+height2-unit*(1+j)*0.13, gapPipes*1.95, unit*0.1)
        } else {
          rect( gapPipes*i+1, marginY2+height2-unit*(1+j)*1.05, gapPipes*1.95, unit*1)
        }
        // console.log(i, j);
      }
      pipeInd++
    }
    pop()
    push()
    fill(0)
    textSize(unit*.6)
    textFont(fontB)
    text("ACCOMODATION", this.posXs[0], marginY2+height2+unit*3 )
    text("HEALTH", this.posXs[1], marginY2+height2+unit*3 )
    text("CARING", this.posXs[2], marginY2+height2+unit*2.2 )
    text("RESPONSABILITIES", this.posXs[2], marginY2+height2+unit*3 )
    text("ENTERTAINMENT", this.posXs[3], marginY2+height2+unit*3 )
    text("EDUCATION", this.posXs[4], marginY2+height2+unit*3 )
    text("BUSINESS", this.posXs[5], marginY2+height2+unit*3 )

    textFont(font)
    text("Maybe your own flat", this.posXs[0], marginY2+height2+unit*4 )
    text("or new appartments", this.posXs[0], marginY2+height2+unit*4.7 )
    text("in better place?", this.posXs[0], marginY2+height2+unit*5.5 )

    text("Or it’s a time to", this.posXs[1], marginY2+height2+unit*4 )
    text("take a care about", this.posXs[1], marginY2+height2+unit*4.7 )
    text("yourself and start ", this.posXs[1], marginY2+height2+unit*5.5 )
    text("going to gym?", this.posXs[1], marginY2+height2+unit*6.3 )

    text("Maybe you would to", this.posXs[2], marginY2+height2+unit*4 )
    text("share your extra ", this.posXs[2], marginY2+height2+unit*4.7 )
    text("money with your", this.posXs[2], marginY2+height2+unit*5.5 )
    text("relatives or friends", this.posXs[2], marginY2+height2+unit*6.3 )
    text("in need or charity?", this.posXs[2], marginY2+height2+unit*7.1 )

    text("Just fun! Travels, ", this.posXs[3], marginY2+height2+unit*4 )
    text("cinema, more parties", this.posXs[3], marginY2+height2+unit*4.7 )
    text("and holidays!", this.posXs[3], marginY2+height2+unit*5.5 )

    text("Higher education,", this.posXs[4], marginY2+height2+unit*4 )
    text("courses of art or", this.posXs[4], marginY2+height2+unit*4.7 )
    text("languages. Maybe", this.posXs[4], marginY2+height2+unit*5.5 )
    text("you could start", this.posXs[4], marginY2+height2+unit*6.3 )
    text("your new way in", this.posXs[4], marginY2+height2+unit*7.1 )
    text("another profession?", this.posXs[4], marginY2+height2+unit*8.0 )

    text("Open your business,", this.posXs[5], marginY2+height2+unit*4 )
    text("make an investment,", this.posXs[5], marginY2+height2+unit*4.7 )
    text("start to be an ", this.posXs[5], marginY2+height2+unit*5.5 )
    text("entrepreneur!", this.posXs[5], marginY2+height2+unit*6.3 )
    pop()
  }
  this.showTotals = function() {
    console.log(this.currScores);
    for (var i = 0; i < totals.length; i++) {
      this.currScores[i] = totals[i] + userScores[i]
    }
    this.show()
    console.log(this.currScores);
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
  totalsRef.push(pipes.currScores)
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

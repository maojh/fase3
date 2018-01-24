
//muovere il token quando è selezionato
//capire dove è stata rilasciato il token
//testare l'aggiornamento dei tokens nei pipes
var smallScreen
var unit
var space

var pipes
//Pipes structure for building
//the interface with nested tokens objects
var currToken
var currMoving = false
var initToken = {}
var rest = 1 //total token available per user (per each loading)
var blocked = false //block the interaction if token are all assigned
//this is the current token
//to allow user interaction
var userScores = [0,0,0,0,0,0]

//Firebase stuff
var ref = database.ref('scores/')

//Variables from dbSetup.js
//scoresRef for pushing current user
//totalRef for fetching and updating totals
//totals is an array which contains the last values

function preload() {
      font = loadFont('assets/Lato/Lato-Regular.ttf')
      fontB = loadFont('assets/Lato/Lato-Bold.ttf')
}


function setup() {
  // var exp = createCanvas(windowWidth / 1.5, windowHeight )
  // var posCanvas = select("#exp1")
  // exp.parent(posCanvas)
  createCanvas(windowWidth / 1.5, windowHeight )

  smallCheck()

  unit = windowWidth / 100
  space = unit * 3

  var initVal = unit*10
  initToken['x'] = initVal
  initToken['y'] = initVal

  frameRate(5)
  currToken = new CurrToken()

}


function draw() {
  //if there is no coin available
  //block the interaction
  if (rest==0) {
    blocked = true
  }

  if(blocked) {
    //Cheers at the end
    background(220, 200, 220)
    text("Thank you", width/2 - unit*3, height / 5)
    sendUserScores()
    noLoop()
  } else {
    //regular background and draw remaining coins
    background(245)
    drawRest()
  }
  //pipes
  pipes = new Pipes()
  //random tokens
  // for (var i = 0; i < pipes.nPipes; i++) {
  //   scores[i] = int(random(0, 100))
  // }
  pipes.showPipes()

  // frame
  push()
  fill(0)
  //sopra
  rect(0, 0, width, space)
  //basement
  rect( width / 4 - unit * 2, height / 1.34, width / 2 + unit * 4, height / 2 )
  //sotto
  rect(0, height - space*1, width, space)
  pop()

  //Generate interactive token
  //show interactive token on top
  //console.log(currMoving);
  currToken.showToken()
  push()
  textSize(15)
  fill('darkOrange')
  text(rest,initToken.x-9, initToken.y+6)
  pop()

  // noLoop()
}

function mouseDragged() {
  currToken.isClicked();
  if (currToken.moving) {
    currToken.showToken()
  }
}
function mouseReleased() {
  //check if one pipe have been clicked, in case add one score to the right pipe
  var addOne = pipes.isHover()
  console.log(addOne); //print the pipe selected for testing
  currMoving = false
}

//interaction function
function CurrToken() {
  this.dim = unit * 5
  this.s = unit * 2
  this.moving = currMoving
  this.x = initToken.x
  this.y = initToken.y

  this.isClicked = function() {
    if (dist(mouseX, mouseY, initToken.x, initToken.y)<(currToken.dim/2)) {
      currMoving = true
      this.showToken(mouseX, mouseY)
    }
    return this.moving
  }
  this.isAssigned = function() {
    //this.moving = false
  }
  this.showToken = function() {
    if (!blocked) {
      push()
      fill(245, 230, 0)
      strokeWeight(2)
      stroke(240, 200, 0)
      if(currMoving) {
        ellipse(mouseX, mouseY, this.dim, this.dim)
      } else {
        ellipse(this.x, this.y, this.dim, this.dim)
      }
      //if not moving it-s not visible
      pop()
    }
  }
}

function drawRest() {
  push()
  fill(245, 230, 0)
  strokeWeight(2)
  stroke(240, 200, 0)
  ellipse(initToken.x, initToken.y, currToken.dim, currToken.dim)
  pop()
}

//STRUCTURE
function Pipes() {
  this.nPipes = 6
  this.lpipes = width / 2
  this.gap = this.lpipes / ((this.nPipes*2) + (this.nPipes-1));  // / 2 / (6*2 l pipes + 5 gap) //34
  this.posPipes = new Array()

  this.showPipes = function () {
    push()
    fill(200)
    stroke(150)
    strokeWeight(2)
    translate(width / 4, height / 4,0)
    var n = 0
    var fac = 3
    for ( var i = 0 ; i < this.lpipes ; i += this.gap * fac) {
      rect(i, 0, this.gap * 2, height / 2)
      this.posPipes.push(i)
      for (var t = 0; t < totals[n]; t++) {
        var token = new Token()
        token.showToken( i+fac, t, totals[n] )
      }
      n++
      if(n == this.nPipes) break
    }
    pop()
  }
  this.isHover = function() {
    var added = false
    push()
    translate(width / 4, height / 4,0)
    //if no pipes has over it remains -1, not a valid array index
    var hover = -1
    for (var j = 0; j < this.posPipes.length; j++) {
      if((mouseY > height/4) && (mouseY < height/0.75)) {
          //mouseX has to be adjusted, it isn't affect by the translate()
          var posMouse = mouseX - width/4
          if((posMouse > this.posPipes[j]) && (posMouse < this.posPipes[j] + this.gap*2)) {
          //tasty test rect(this.posPipes[j],0,this.gap * 2,height/2)
          //hover = j //return the clicked pipes index
          //add on token to the right pipe
          if(!blocked) {
            // scores[hover+1]++
            userScores[j]++
            console.log(userScores[j]);
            added = "Added:" + true
            rest--
          }
        }
      }
    }
    pop()
    return added
  }
}

function Token() {
  this.dim = pipes.gap * 1.8//5
  this.s = unit * 2
  this.moving = false

  this.showToken = function(x, y) {
    this.checkSmax()
    push()
    translate(0, height / 2 - this.s - 4, 0)
    fill(245, 200, 0)
    stroke(245, 220, 0)

    if(this.moving) {
      ellipse( mouseX, mouseY, this.dim, this.dim )
    } else {
      rect( x, 0 - y * this.s, this.dim, this.s )
    }
    pop()
  }

  this.checkSmax = function() {
    //Max value to be shown
    var max = 0
    for (var i = 0; i < 6; i++) {
      if ( max < totals[i] ) {
        max = totals[i]
      }
    }
    //more tokens thinner tokens
    var currMax = int((height / 2) / this.s)
    // console.log(currMax);
    if(max >= currMax) {
      this.s = unit * 1.5 //max 49 tokens
      var currMax2 = int((height / 2) / this.s)
      console.log(currMax2);
      if(max >= currMax2) {
        this.s = unit * 1 //max 61 tokens
        var currMax3 = int((height / 2) / this.s)
        console.log(currMax3);
        if(max >= currMax3) {
          this.s = unit * 0.8 //max 91 tokens
        }
      }
    }
    //adapt tokens width in small screens
    if (smallScreen) {
      this.dim = pipes.gap * 1.4//5
    }
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
  resizeCanvas(windowWidth / 1.5, windowHeight);
  smallCheck()
}

function smallCheck() {
  smallScreen = false
  if(windowWidth < 600) {
    console.log('small');
    smallScreen = true
    resizeCanvas(windowWidth, windowHeight / 1.3);
  } else if (windowWidth > 600) {

  }
}

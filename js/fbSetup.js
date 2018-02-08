// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1lDhoDahvtIcCKZeVuDyCbC8d3rUIkzA",
  authDomain: "ubi3-8c834.firebaseapp.com",
  databaseURL: "https://ubi3-8c834.firebaseio.com",
  projectId: "ubi3-8c834",
  storageBucket: "ubi3-8c834.appspot.com",
  messagingSenderId: "1098998582605"
};
firebase.initializeApp(config);

//Initialize DB
var database = firebase.database()
//Set scores registry
postRef = database.ref('posts/')
scoresRef = database.ref('scores/')
totalsRef = database.ref('totals/')

//Get last totals, attaching event
postRef.on('value', gotPosts, errData)

// Global variable with last totals as an object
totalsRef.on('value', gotTotals, errData)

function gotPosts(data) {
  //Global variable set in index.html
  posts = data.val();
  postsKeys = Object.keys(posts)
  for (var i = 0; i < postsKeys.length; i++) {
    prevPosts.push(posts[postsKeys[i]].post);
  }
  console.log(prevPosts);
  // console.log(postsobj[0].post);
}
function gotTotals(data) {
  //Global variable set in index.html
  if (data.val()!= null) {
    totalsKeys = Object.keys(data.val())
    totalsobj = data.val()[totalsKeys[totalsKeys.length-1]];

    lastKeys = Object.keys(totalsobj)

    for(var i=0;i<lastKeys.length;i++) {
      totals[i] = totalsobj[lastKeys[i]]
      // console.log(totals[i])
    }
  } else {
    totals = [0,0,0,0,0,0]
    totalsRef.push(totals)
    console.log('totals is null');
  }
}

function errData(error) {
  console.log("no data retrieved", error);
}

// ref.push() is for writing and
// ref.set() is for overwriting, updating

// Testing
// var data = {
//   "user": "matteo",
//   "score": "3"
// }
// ref.push(data, pushResult)
//
// function pushResult(error) {
//   if(error) {
//     console.log('nay');
//   } else {
//     console.log('got it');
//   }
// }

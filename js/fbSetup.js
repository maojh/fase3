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
var postRef = database.ref('posts/')

//Get last totals, attaching event
postRef.on('value', gotPosts, errData)

// Global variable with last totals as an object

function gotPosts(data) {
  //Global variable set in index.html
  posts = data.val();
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

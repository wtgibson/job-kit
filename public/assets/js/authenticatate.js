var firebaseConfig = {
    apiKey: "AIzaSyCOL2GHyCkjocrhm2VJdOZUP_1eZMK9wVE",
    authDomain: "jobkit-project-2.firebaseapp.com",
    databaseURL: "https://jobkit-project-2.firebaseio.com",
    projectId: "jobkit-project-2",
    storageBucket: "jobkit-project-2.appspot.com",
    messagingSenderId: "978184031668",
    appId: "1:978184031668:web:403d06d916e942e6ee76e1",
    measurementId: "G-TKMGLB01WM"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
// var database = firebase.database();

// event listener for login screen
$("#login-button").on("click", function (event) {
    event.preventDefault();
    var email = $("#email");
    var password = $("#password");
    console.log(email);
    console.log(password);

  // validate the email/password credentials

  // email field input validation
  if (email.val().length < 1) { // cannot be empty
    // change the email input's placeholder and set focus
    email.attr("placeholder", "This field cannot be empty!")
    email.focus();
  }

  // password field input validation
  else if (password.val().length < 6) { // cannot be less than 6 characters
    // change password input's placeholder and set focus
    password.attr("placeholder", "Password must be at least 6 characters!")
    password.focus();
  }

  // if all validations check out
  else {
    // use firebase to sign in
    firebase.auth().signInWithEmailAndPassword(email.val(), password.val())
      // after user is signed in
      .then(function (data) {
        // console log the returned data
        console.log('authentiated');
        console.log(data);

        // let's clear the input fields
        email.val("");
        password.val("");
        password.attr("placeholder", "");

        
        
      })
      // User email/password did not match or is not in firebase
      .catch(function (error) {
        alert("Error: " + error.message)
      })
  }
})

// Event listener from Firebase that checks with user auth state changes
firebase.auth().onAuthStateChanged(function (user) {
    // if user is authenticated then...
    if (user) {
        // grantAccess
        grantAccess();
    } else {
        // run the removeAccess function
        removeAccess();
    }
})

// function to manipulate dom after user is authenticated
function grantAccess() {
    // get currentUser information from firebase
    var user = firebase.auth().currentUser;
    // save that information to sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user))

    // retrieve user info saved in database
    getUserInfo(user.uid)

    // manipulate the dom
    $("#signIn").addClass("d-none");
    $("#setProfile").removeClass("d-none");
}

// function to manipulate dom after user is no longer authenticated
function removeAccess() {
    // remove user from sessionStorage
    sessionStorage.removeItem("user");

    // manipulate the dom
    $("#setProfile").addClass("d-none");
    $("#signIn").removeClass("d-none");
}

// Event listener for Sign Out button
$("#signout").on("click", function (event) {
    event.preventDefault();

    // sign out of firebase
    firebase.auth().signOut();
})

// // Event listener for Save Button
// $(".save").on("click", function (event) {
//     event.preventDefault();
//     // retrieve input field values
//     var username = $("#name").val().trim();
//     var favoriteFood = $("#food").val().trim();

//     // retrieve user from sessionStorage
//     var user = JSON.parse(sessionStorage.getItem("user"))

//     // write to firebase database
//     database.ref("users/" + user.uid).set({
//         username: username,
//         favoriteFood: favoriteFood
//     })
//         // then retrieve from database
//         .then(function () {
//             // call getUserInfo function with user.uid as argument
//             getUserInfo(user.uid);
//         })
// })

// function to retrieve user info
// function getUserInfo(uid) {
//     database.ref("users/" + uid).once("value")
//         .then(function (snapshot) {
//             // console log the snapshot's value returned from database
//             console.log(snapshot.val())

//             // modify the dom to reflect new information
//             $("#username").html(snapshot.val().username)
//             $("#favoriteFood").html(snapshot.val().favoriteFood)
//         })
// }
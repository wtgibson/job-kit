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
        console.log(`authentiated user: ${data.user.email}`);
        console.log(data);

        // let's clear the input fields
        email.val("");
        password.val("");
        password.attr("placeholder", "");

        // Log authenticated user into local DB
        let loginData = { email: data.user.email };

        $.ajax("/api/login", {
          type: "PUT",
          data: loginData,
        }).then(res => {
          // stores the user id to the globalUserID
          globalUserID = res
          // reroutes the user to the applications page once they have been authenticated
          window.location.replace("/applications");
        });

      })
      // User email/password did not match or is not in firebase
      .catch(function (error) {
        console.log(error.code);
        if (error.code === "auth/user-not-found") {
          location.assign('/signup');
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
      // getUserInfo(user.uid)

      // manipulate the dom

    }

    // function to manipulate dom after user is no longer authenticated
    function removeAccess() {
      // remove user from sessionStorage
      sessionStorage.removeItem("user");

      // manipulate the dom
      // $("#setProfile").addClass("d-none");
      // $("#signIn").removeClass("d-none");
    }

    // Event listener for Sign Out button
    $("#signout").on("click", function (event) {
      event.preventDefault();

      // sign out of firebase
      firebase.auth().signOut();
    })
  }
});
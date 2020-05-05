// var firebaseConfig = {
//     apiKey: "AIzaSyCOL2GHyCkjocrhm2VJdOZUP_1eZMK9wVE",
//     authDomain: "jobkit-project-2.firebaseapp.com",
//     databaseURL: "https://jobkit-project-2.firebaseio.com",
//     projectId: "jobkit-project-2",
//     storageBucket: "jobkit-project-2.appspot.com",
//     messagingSenderId: "978184031668",
//     appId: "1:978184031668:web:403d06d916e942e6ee76e1",
//     measurementId: "G-TKMGLB01WM"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// event listener for submit button
$("#signup-button").on("click", function (event) {
    // prevent form submit button from doing default things like sending information and refreshing the page
    event.preventDefault();
  
    // form input validation
  
    // first, we select the inputs we need to validate (passwords)
    var email = $("#email");
    var password = $("#password");
    var confirm = $("#confirm");
    // console.log(email.val());
  
    // now we validate them
  
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
  
    // confirm field input validation
    else if (confirm.val() !== password.val()) { // doesn't match password
      // empty confirm field
      confirm.val("");
      // set placeholder to notify user
      confirm.attr("placeholder", "Doesn't match password. Try again.");
      // set focus on this field
      confirm.focus();
    }
  
    // if all validations check out
    else {
      console.log("authenticating with Firebase");
      // use firebase to register
      firebase.auth().createUserWithEmailAndPassword(email.val(), password.val())
        // after user is registered
        .then(function (data) {
          
          // clear the input fields
          email.val("");
          password.val("");
          password.attr("placeholder", "");
          confirm.val("");
          confirm.attr("placeholder", "");
            
          // console.log("==== signedup ====");
          // console.log(data.user.email);
          
          let signupData = { email: data.user.email };
          console.log(signupData);

          $.ajax("/api/signup", {
            type: "POST",
            data: signupData,
          }).then(res => {
            // console.log(res);
            // sessionStorage.setItem('uuid', res.id);
            // sessionStorage.setItem('clid', res.codLang);
            firebase.auth().signOut();
            window.location.replace("/login");
          });
        })
        .catch(function (error) {
          // uh oh, something broke. let's tell them why
          console.log("Error: " + error.message);
          res.send("Error " + error.message)
        })
    }
  })
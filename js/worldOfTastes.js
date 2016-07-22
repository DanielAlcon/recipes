function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  // comprobar ID, != undefined o null, usar location="la rutaque yo quiera"
  var user = profile.getEmail();
  if (user != undefined) {
    window.location.href="#/";
    //show botón de signout
    var signOut = '<a href="#/" onclick="signOut();">Sign out</a>';
    $('#logged-in').html(signOut);
  }
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  var signIn = '<a href="#/login">Login <span class="sr-only">(current)</span></a>';
  $('#logged-in').html(signIn);
}
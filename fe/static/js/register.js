$(document).ready(function(){
    document.getElementById('sign_up_form').reset(); 
});
// show password
function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}
// show password at login
function showPassword_login() {
    var x = document.getElementById("password_login");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// base_url = "http://127.0.0.1:8000/api/v1"
base_url = "https://petbor.herokuapp.com/api/v1"
// SIGN UP API
$(function(){
    $('#signup_submit_button').on('click', function (e) {
        e.preventDefault();
        console.log("signup clicked");
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let phonenumber = document.getElementById("phonenumber").value;
        let password = document.getElementById("password").value;
        let confirm_password = document.getElementById("confirm_password").value;
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password =="" || confirm_password == "" || lastname == "" || firstname == "" || phonenumber == "" || email == ""){
        document.getElementById("message_one").style.display = "block";
          setTimeout(function(){ 
            document.getElementById("message_one").style.display = "none";
          }, 3000);
        }
        else{
            if (password != confirm_password){
                document.getElementById("message").innerHTML = "Password not the same"
                document.getElementById("message").style.display = "block";
                setTimeout(function(){ 
                    document.getElementById("message").style.display = "none";
                    document.getElementById("message").innerHTML = ""
                  }, 3000);
                // 
            }
            else if (!password.match(passw)){
                document.getElementById("message").style.display = "block";
                document.getElementById("message").innerHTML = "Sorry! passwords must have at least one non alphanumeric character, [A-Z], [1-9] and no less than 6 characters.";
                setTimeout(function(){ 
                    document.getElementById("message").style.display = "none";
                    document.getElementById("message").innerHTML = ""
                  }, 5000);
                // 
            }
            else{
                let data={
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    phoneNumber: phonenumber,
                    password: password,
                }
                document.getElementById("spinner").style.display = "block";
                $.ajax({
                    url: base_url+'/signup',
                    type:'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers:{"X-CSRFToken": $crf_token},
                    data:JSON.stringify(data),
                    success:function(response){
                        console.log(response)
                        document.getElementById("spinner").style.display = "none";
                        if(response.success == false){
                            document.getElementById('server_message_error').classList.add("alert-danger");
                            document.getElementById('server_message_error').innerHTML = response.message;
                            document.getElementById("server_message_error").style.display = "block";
                            setTimeout(function(){ 
                                document.getElementById("server_message_error").style.display = "none";   
                            }, 3000);
                            
                        }
                        else{
                            window.location.href = '/verify/'+response.user_id;
                        }
                        console.log(response);
                    },
                    error:function(e){
                        console.log(e);
                        $("#spinner").hide();
                    },
                });
                
            }
        }
        
    });
});

// SIGN IN API
$(function(){
    $('#signin_submit_button').on('click', function (e) {
        e.preventDefault();
        console.log("signin clicked");

        let email = document.getElementById("email_login").value;
        let password = document.getElementById("password_login").value;
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        let data={
            email: email,
            password: password,
        }
        document.getElementById("spinner").style.display = "block";
        $.ajax({
            url: base_url+'/signin',
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers:{"X-CSRFToken": $crf_token},
            // headers: {"Authorization": localStorage.getItem('token')},
            data:JSON.stringify(data),
            success:function(response){
                
                
                if(response.status == 205){
                    window.location.href = '/verify/'+response.user_id;
                    document.getElementById('server_message_error').innerHTML = response.message;
                }
                if(response.success == true && response.status == 200){
                    // sessionStorage.setItem("token", response.token);
                    sessionStorage.setItem("user_id", response.user_id);
                    user_id = sessionStorage.getItem("user_id");
                    console.log(response);
                    // if (response.role == 1){
                        window.location.href = '/user_dashboard/'+user_id;
                    // }
                    // else{
                    //     window.location.href = '/sp_dashboard/'+token;
                    // }
                    document.getElementById("spinner").style.display = "none";
                    
                }
                else{
                    document.getElementById("spinner").style.display = "none";
                    document.getElementById('server_message_error').innerHTML = response.message;
                }
            },
            error:function(e){
                console.log(e);
                $("#spinner").hide();
            },
        });
        
    });
});

// VERIFY API
$(function(){
    $('#verify_submit').on('click', function (e) {
        e.preventDefault();
        let user_id = document.getElementById("user_id_verify").value;
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        let code = document.getElementById("code_verify").value;
        document.getElementById("spinner").style.display = "block";
        $.ajax({
            url: base_url+'/verify',
            type:'POST',
            headers:{"X-CSRFToken": $crf_token},
            data:{
                code: code,
                user_id: user_id,
            },
            success:function(response){
                console.log(response)
                document.getElementById("spinner").style.display = "none";
                if(response.success == false){
                    document.getElementById('server_message_error').classList.add("alert-danger");
                    document.getElementById('server_message_error').innerHTML = response.message;
                    document.getElementById("server_message_error").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_error").style.display = "none"; 
                    }, 3000);  
                }
                else{
                    window.location.href = '/user_dashboard/'+user_id;
                    // if (response.role == 1){
                    //     window.location.href = '/client_dashboard/'+user_id;
                    // document.getElementById('p_id').innerHTML = user_id;
                    // }else{
                    //     window.location.href = '/sp_dashboard/'+user_id;
                    // }

                }
                console.log(response);
            },
            error:function(e){
                console.log(e);
                $("#spinner").hide();
            },
        });
        
        
    });
});

// RESEND CODE API
$(function(){
    $('#resend_submit').on('click', function (e) {
        e.preventDefault();
        let user_id = document.getElementById("user_id_verify").value;
        document.getElementById("spinner").style.display = "block";
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        $.ajax({
            url:base_url+'/resend_code',
            type:'POST',
            headers:{"X-CSRFToken": $crf_token},
            data:{
                user_id: user_id,
            },
            success:function(response){
                document.getElementById("spinner").style.display = "none";
                if(response.success == false){
                    document.getElementById('server_message_error').classList.add("alert-danger");
                    document.getElementById('server_message_error').innerHTML = response.message;
                    document.getElementById("server_message_error").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_error").style.display = "none"; 
                    }, 3000);
                    
                }
                else{
                    document.getElementById('server_message_success').classList.add("alert-primary");
                    document.getElementById('server_message_success').innerHTML = response.message;
                    document.getElementById("server_message_success").style.display = "block";
                    document.getElementById("verify_form").reset()
                }
                console.log(response);
            },
            error:function(e){
                $("#spinner").hide();
                console.log(e);
            },
        });
    });
});

// FORGOT- SEND RESED CODE CODE API
$(function(){
    $('#forgot_submit').on('click', function (e) {
        e.preventDefault();
        let email = document.getElementById("forgot_email").value;
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        document.getElementById("spinner").style.display = "block";
        $.ajax({
            url:base_url+'/forgot_password',
            type:'POST',
            headers:{"X-CSRFToken": $crf_token},
            data:{
                email: email,
            },
            success:function(response){
                // $("#loader").hide();
                document.getElementById("spinner").style.display = "none";
                if(response.success == false){
                    document.getElementById('server_message_error').classList.add("alert-danger");
                    document.getElementById('server_message_error').innerHTML = response.message;
                    document.getElementById("server_message_error").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_error").style.display = "none"; 
                    }, 3000);
                    
                }
                else{
                    document.getElementById('server_message_success').classList.add("alert-primary");
                    document.getElementById('server_message_success').innerHTML = response.message;
                    document.getElementById("server_message_success").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_success").style.display = "none"; 
                        window.location.href = '/verify_password/'+response.user_id;
                    }, 3000);
                }
                console.log(response);
            },
            error:function(e){
                console.log(e);
                $("#loader").hide();
            },
        });
        
        
    });
});

// VERIFY PASSOWRD CHANGE API
$(function(){
    $('#verify_password_submit').on('click', function (e) {
        e.preventDefault();
        let user_id = document.getElementById("verify_user_id").value;
        let code = document.getElementById("code").value;
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        document.getElementById("spinner").style.display = "block";
        $.ajax({
            url:base_url+'/confirm_user_password',
            type:'POST',
            headers:{"X-CSRFToken": $crf_token},
            data:{
                code: code,
                user_id: user_id
            },
            success:function(response){
                $("#loader").hide();
                document.getElementById("spinner").style.display = "none";
                if(response.success == false){
                    document.getElementById('server_message_error').classList.add("alert-danger");
                    document.getElementById('server_message_error').innerHTML = response.message;
                    document.getElementById("server_message_error").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_error").style.display = "none"; 
                        
                    }, 3000);
                    
                }
                else{
                    window.location.href = '/reset_password/'+response.user_id;
                }
                console.log(response);
            },
            error:function(e){
                $("#spinner").hide();
                console.log(e);
            },
        });
    });
});

// CHANGE PASSWORD API
$(function(){
    $('#change_password_submit').on('click', function (e) {
        e.preventDefault();
        let user_id = document.getElementById("reset_user_id").value;
        let password = document.getElementById("password").value;
        let confirm_password = document.getElementById("confirm_password").value;
        let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        document.getElementById("spinner").style.display = "block";
        $.ajax({
            url:base_url+'/change_password',
            type:'POST',
            headers:{"X-CSRFToken": $crf_token},
            data:{
                password: password,
                user_id: user_id,
                confirm_password: confirm_password,
            },
            success:function(response){
                document.getElementById("spinner").style.display = "none";
                if(response.success == false){
                    document.getElementById('server_message_error').classList.add("alert-danger");
                    document.getElementById('server_message_error').innerHTML = response.message;
                    document.getElementById("server_message_error").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_error").style.display = "none"; 
                    }, 3000);
                    
                }
                else{
                    document.getElementById('server_message_success').classList.add("alert-primary");
                    document.getElementById('server_message_success').innerHTML = response.message;
                    document.getElementById("server_message_success").style.display = "block";
                    setTimeout(function(){ 
                        document.getElementById("server_message_success").style.display = "none"; 
                        window.location.href = '/signin';
                    }, 2000);
                }
                console.log(response);
            },
            error:function(e){
                $("#spinner").hide();
                console.log(e);
            },
        });
        
        
    });
});




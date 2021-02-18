function isValidPassword(password)
{
    if(password.length < 8)
    {
        document.getElementById("password_invalid").innerHTML =  "Password too short.";
      	console.log('Password too short');
        return false;	
    }
    if(password.indexOf(' ') !== -1)
    {
        document.getElementById("password_invalid").innerHTML =  "Password too short.";
      	console.log('Password contains spaces');
        return false;
    }
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/;
    if(!regex.test(password))
    {
        document.getElementById("password_invalid").innerHTML =  "Password must contain at least one number, lowercase, one uppercase"
        + " and one special character.";
        console.log("Password must contain at least one number, lowercase, one uppercase"
        + " and one special character.");
        return false;
    }
    document.getElementById("password_invalid").innerHTML = "";
  	console.log("Password is valid");
    return true;
}

function signup()
{
  // TODO: add user validation to check if user email exists already
  let ans = true;
  let pw = document.getElementById("pw").value;
  let pw2 = document.getElementById("pwconfirm").value;
  if(!isValidPassword(pw))
  {
    console.log("invalid pw");
    ans = false;
  }
  if(pw !== pw2)
  {
    document.getElementById("password_not_confirmed").innerHTML = "Passwords do not match."
    console.log("pws do not match");
    ans = false;
  }
  else
  {
    document.getElementById("password_not_confirmed").innerHTML = "";
  }

  return ans;
}

export default isValidPassword;
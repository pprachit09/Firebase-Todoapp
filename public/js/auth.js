//sign up form values
const signUp = document.querySelector('#signup-form');

signUp.addEventListener('submit', e => {
    e.preventDefault();

    //user data
    const firstName = signUp['firstname'].value;
    const lastName = signUp['lastname'].value;
    const email = signUp['email'].value;
    const psw = signUp['psw'].value;
    const atpos = email.indexOf("@");
    const dotpos = email.lastIndexOf(".");

    const letters = /^[A-Za-z]+$/;
    //validate sign up form

    if ((!firstName.match(letters)) || firstName.trim() == ''){
        alert("Please enter valid firstname")
        return false;
    }

    if (!lastName.match(letters) || lastName.trim() == ''){
        alert("Please enter valid lastname")
        return false;
    }


    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        alert("Please enter valid e-mail address");
        return false;
    } 

    if (psw.length <= 6 || psw.trim() == ''){
        alert('Weak password')
        return false;
    }

    //add the use in database
    auth.createUserWithEmailAndPassword(email, psw).then(creds => {
        console.log(creds);
        signUp.reset();
        document.getElementById("myForm").style.display = "none";
        document.getElementsByClassName("container")[0].style.WebkitFilter = 'blur(0px)';
        document.getElementsByClassName("container")[0].style.filter= 'blur(0px)';
    }).catch(err => {
        alert(err.message)
    })
})

const logIn = document.querySelector('#login-form');

//login listen events
logIn.addEventListener('submit', e => {
    e.preventDefault();
    //data from form
    const email = logIn['login-email'].value;
    const psw = logIn['login-psw'].value;

    auth.signInWithEmailAndPassword(email, psw).then( creds => {
        window.location.replace('main.html')
    }).catch( error => {
        console.log(error)
        alert("Invalid credentials")
        logIn.reset()
    })
})
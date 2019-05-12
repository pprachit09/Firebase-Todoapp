//sign up form values
const signUp = document.querySelector('#signup-form');

signUp.addEventListener('submit', e => {
    e.preventDefault();

    //user data
    const firstName = signUp['firstname'].value;
    const lastName = signUp['lastname'].value;
    const email = signUp['email'].value;
    const psw = signUp['psw'].value;

    //add the use in database
    auth.createUserWithEmailAndPassword(email, psw).then(creds => {
        console.log(creds);
        signUp.reset();
        document.getElementById("myForm").style.display = "none";
        document.getElementsByClassName("container")[0].style.WebkitFilter = 'blur(0px)';
        document.getElementsByClassName("container")[0].style.filter= 'blur(0px)';
    })
})

const logIn = document.querySelector('#login-form');

logIn.addEventListener('submit', e => {
    e.preventDefault();
    //data from form
    const email = logIn['login-email'].value;
    const psw = logIn['login-psw'].value;

    auth.signInWithEmailAndPassword(email, psw).then( creds => {
        console.log(creds)
        window.location.replace('../index.html')
    }).catch( error => {
        console.log(error)
        alert("Invalid credentials")
        logIn.reset()
        window.location.replace('index.html')
    })
})
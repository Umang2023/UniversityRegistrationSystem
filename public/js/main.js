const inputs = document.querySelectorAll(".input");

function focusFunx() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunx);
});
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username , password)
    // if (username === "user" && password === "pwd") {
    //     alert("You have successfully logged in.");
    //     location.reload();
    // } else {
    //     loginErrorMsg.style.opacity = 1;
    // }
    fetch('/login',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:username,
            password:password
        })
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})
const inputs = document.querySelectorAll(".input");

function focusFunx() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunx);
});

const signupForm = document.getElementById("signup-form");
console.log(signupForm);

const signupButton = document.getElementById("signup-form-submit");
console.log(signupButton);
signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    console.log(username, email, password);
    // alert("Success");
    fetch('/user/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: username
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            if (data) {
                if (data.message = "user saved successfully") {
                    // window.location.href = "/"
                    console.log("Success")
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
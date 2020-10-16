let icons = document.querySelectorAll(".label-icon");
let inputs = document.querySelectorAll(".app-form div input")
let eyeShow = document.querySelector(".eye-show");
let eyeHide = document.querySelector(".eye-hide");
let passwordInput = document.querySelector("#password");
let inputToggle = document.querySelector(".eye-icon-toggle");
let form = document.querySelector(".app-form");
let mainForm = document.querySelector(".form-sign-up")
let gender = document.querySelector("gender");
let success = document.querySelector(".success");
let submit2 = document.querySelector(".submit2");
let successAlert = document.querySelector(".success-alert")
let name = document.getElementById("fn");

inputs.forEach(element => {
    // console.log(element.previousElementSibling.className);
    element.addEventListener('focus', (e) => {
        img = e.target.previousElementSibling;
        img.classList.add("label-icon-anim");

    })

    element.addEventListener('focusout', (e) => {
        img = e.target.previousElementSibling;
        img.classList.remove("label-icon-anim");
        if (e.target.type == 'tel') {
            e.target.value = phoneFormat(e.target.value);
            console.log(phoneFormat(e.target.value));
        }

    })

    element.addEventListener('input', function(e) {
        let type = e.target;
        if (type.type == "radio") {
            if (e.target.className == "male") {
                e.target.parentElement.style.borderColor = "green";
                e.target.parentElement.style.borderWidth = "2px";
                document.querySelector('.female').parentElement.style.borderColor = "#b41f0b"
            } else {
                e.target.parentElement.style.borderColor = "green";
                e.target.parentElement.style.borderWidth = "2px";
                document.querySelector('.male').parentElement.style.borderColor = "#b41f0b"
            }

            if (!e.target.checked) e.target.parentElement.style.borderColor = "#b41f0b";
            return;
        }
        parentElement = e.target.parentElement;
        toolipMain = parentElement.querySelector(".toolip");
        checkValidity = validOption(type, e.target.value);

        showOrHideTollip(toolipMain, "toolip-ease", checkValidity);
        if (checkValidity) {
            e.target.style.borderColor = "green";
            e.target.style.borderWidth = "2px";
        } else {
            e.target.style.borderColor = "#b41f0b";
            e.target.style.borderWidth = "1px";
        };

    })
})


//onsubmit
form.onsubmit = submit;
// form.action = "http://www.google.com";
let check

function submit(e) {
    // alert(input);
    let check = true;
    inputs.forEach(element => {
        if (element.type != 'radio') {
            check = check && validOption(element, element.value);
        }
    })
    e.preventDefault();
    console.log(check);
    if (check) {
        name = (fn.value).split(" ");
        successAlert.textContent = name[0] + ", Successfully Registered";
        showHideSection(success, mainForm);
        resetForm(inputs);
    } else {
        inputs.forEach(element => {
            if (element.value == "") {
                toolipMain = element.parentElement.querySelector(".toolip");
                showOrHideTollip(toolipMain, "toolip-ease", false);
            }
        })
    }

    return check;
}

// ------------------------------------------------------ //


// section - 2

submit2.addEventListener('click', function() {
    showHideSection(mainForm, success);
})



function showHideSection(toShow, toHide) {
    if (toHide.style.display = "none") toShow.style.display = "block";
}


function resetForm(array) {
    array.forEach(element => {
        element.value = "";
        element.style.borderWidth = "1px";
        element.style.borderColor = "#b41f0b";
        if (element.type == "radio") {
            element.checked = false
            element.parentElement.style.borderWidth = "1px";
            element.parentElement.style.borderColor = "#b41f0b";
        }
    });
}










// ---------------------------------------------------






//toggling the eye
eyeShow.addEventListener('click', () => {
    hideShow(eyeHide, eyeShow)
    unHideUnSet(passwordInput);
})

eyeHide.addEventListener('click', () => {
    hideShow(eyeShow, eyeHide);
    unHideUnSet(passwordInput);
})





function hideShow(toShow, toHide) {
    toHide.style.display = "none";
    toShow.style.display = "unset";

}

function unHideUnSet(unHide) {
    if (unHide.type == "text") {
        unHide.type = "password";
    } else {
        unHide.type = "text";
    }
}




//event listener 
function validOption(type, checkType) {
    if (type.className == "password") return validatePassword(checkType);
    if (type.type == 'text') return validateName(checkType);
    if (type.type == 'email') return validateEmail(checkType);
    if (type.type == 'tel') {
        return validatePhone(phoneFormat(checkType));
    }
}
//^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@_\-*]).{8,}$

//function
function validateName(name) {
    return /[A-Za-z]+\s[A-Za-z]+/.test(name);
}

function validateEmail(email) {
    return /^[A-Za-z]*(\d*)?[@]\w+[.]\w{2,}[\.\w]*$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*).{8,}$/.test(password);
}

function validatePhone(phone) {
    return /^(\(\+\d{1,}\))\s(\d){3}\s(\d){3}\s(\d){4}$/.test(phone);
}

function phoneFormat(phone) {
    return phone.replace(/^\D*(\d{1,})\s*(\d{3})\s*(\d{3})\s*(\d{4})\s*$/, "(+$1) $2 $3 $4");
}


//validation section

function showOrHideTollip(toolipMain, toolip, checkValidity) {
    if (checkValidity) toolipMain.classList.remove(toolip)
    else toolipMain.classList.add(toolip);
}
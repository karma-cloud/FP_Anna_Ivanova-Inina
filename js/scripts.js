window.addEventListener('load', fillFormFromLocalStorage);

function validateFields(firstName, lastName, email, phone, message) {
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,}\(\d{3}\)\d{2}-\d{2}-\d{3}$/;
    const mesRegex =/^.+$/;

    const isFirstNameValid = nameRegex.test(firstName);
    const isLastNameValid = nameRegex.test(lastName);
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phone === '' || phoneRegex.test(phone);
    const isMessageValid = mesRegex.test(message);

    setValidationStyle('firstName', isFirstNameValid);
    setValidationStyle('lastName', isLastNameValid);
    setValidationStyle('email', isEmailValid);
    setValidationStyle('phone', isPhoneValid);
    setValidationStyle('message', isMessageValid);
    let valmessage = '';
    if(!isFirstNameValid){
        valmessage += 'The First Name field cannot be empty and must consist of letters \n';
    }
    if(!isLastNameValid){
        valmessage += 'The Last Name field cannot be empty  and must consist of letters\n';
    }
    if(!isEmailValid){
        valmessage += 'The Email field cannot be empty and  looks like test@test.tu \n';
    }
    if(!isPhoneValid){
        valmessage += 'The Phone field looks like +X(XXX)XX-XX-XXX \n';
    }
    if(!isMessageValid){
        valmessage += 'The Message field cannot be empty \n';
    }
    return valmessage;
}

function setValidationStyle(elementId, isValid) {
    const inputElement = document.getElementById(elementId);
    inputElement.style.border = isValid ? '1px solid #FFC6A9' : '2px solid red';
}

function validateAndSubmit() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const isValid = validateFields(firstName, lastName, email, phone, message);
    if (isValid === '') {
        setCookieAndProcess(firstName, lastName, email);
        clearLocalStorage();
    } else {
        alert(isValid);
    }
}

function clearLocalStorage() {
    localStorage.removeItem('feedbackData');
}


function saveDataToLocalStorage() {
    const feedbackData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
    };
    localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
}

function fillFormFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('feedbackData')) || {};
    document.getElementById('firstName').value = storedData.firstName || '';
    document.getElementById('lastName').value = storedData.lastName || '';
    document.getElementById('email').value = storedData.email || '';
    document.getElementById('phone').value = storedData.phone || '';
    document.getElementById('message').value = storedData.message || '';
}
window.addEventListener('input', function (evt) {saveDataToLocalStorage() })

function setCookieAndProcess(firstName, lastName, email) {
    const cookieName = firstName+lastName+email;
    const feedbackSent = getCookie(cookieName);

    if (!feedbackSent) {
        setCookie(cookieName, `${firstName} ${lastName}`);
        alert(`${firstName} ${lastName}, thank you for contacting us!`);
    } else {
        alert(`${firstName} ${lastName}, your request is being processed!`);
    }
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}


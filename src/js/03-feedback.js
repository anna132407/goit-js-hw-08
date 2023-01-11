import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';


const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    message: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onMessageInput, 500));

populateMessage();

function onFormSubmit(event) {
    event.preventDefault();

    if (event.target.email.value.trim() === '' || event.target.message.value.trim() === '') {
        alert('Please fill all fields');
        return;
    }

    console.log({email: refs.email.value, message: refs.message.value});
    
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onMessageInput(event) {
    const message = JSON.stringify({ email: refs.email.value, message: refs.message.value });
    localStorage.setItem(STORAGE_KEY, message);
}


function populateMessage() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedMessage) {
        refs.email.value = savedMessage.email;
        refs.message.value = savedMessage.message;
  }
}


import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    message: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.message.addEventListener('input', throttle(onMessageInput, 500));

refs.form.addEventListener('input', event => {
    formData[event.target.email] = event.target.value;
    console.log(formData);
});

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
    const message = event.target.value;
    localStorage.setItem(STORAGE_KEY, message);
}


function onFormInput() {
    const formData = JSON.stringify({email: refs.email.value, message: refs.message.value})
    localStorage.setItem(STORAGE_KEY, formData);
}


function populateMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    refs.message.value = savedMessage;
  }
}


let registerPassword = document.querySelector('#register-password');
let registerPasswordConfirm = document.querySelector(
  '#register-password-confirm',
);

registerPasswordConfirm.addEventListener('focusout', verifyPasswordsMatching);

function verifyPasswordsMatching() {
  if (registerPassword.value === registerPasswordConfirm.value) {
    registerPassword.style.backgroundColor = 'green';
    registerPasswordConfirm.style.backgroundColor = 'green';
  } else {
    registerPassword.style.backgroundColor = 'red';
    registerPasswordConfirm.style.backgroundColor = 'red';
  }
}

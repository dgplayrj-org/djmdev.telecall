class Validator {
  constructor() {
    this.validations = [
      'required',
      'email-validate',
    ];
  }

  validate(form) {
    let currentValidations = form.querySelectorAll('.error-validation');
      if (currentValidations.length > 0) {
        this.cleanValidations(currentValidations);
    }

    let inputs = form.getElementsByTagName('input');
    let inputsArray = [...inputs];
    let isValid = true;

    inputsArray.forEach((input) => {
      this.validations.forEach((validation) => {
        if (input.getAttribute('data-' + validation) !== null) {
          let method = validation.replace('-', '');
          let value = input.getAttribute('data-' + validation);
            if (typeof this[method] === 'function') {
              if (!this[method](input, value)) {
                isValid = false;
            }
          }
        }
      });
    });

    if (isValid) {
      resetpass('E-mail enviado com sucesso! ✉');
    }
  }

  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/;
    let email = input.value;
    let errorMessage = 'Insira um e-mail válido!';
      if (!re.test(email)) {
        this.printMess(input, errorMessage);
          return false;
    }
    return true;
  }

  required(input) {
    let inputValue = input.value;
      if (inputValue === '') {
        let errorMessage = 'Este campo é obrigatório!';
          this.printMess(input, errorMessage);
            return false;
    }
    return true;
  }

  printMess(input, msg) {
    let errorQnt = input.parentNode.querySelector('.error-validation');
      if (errorQnt === null) {
        let template = document.querySelector('.error-validation.template').cloneNode(true);
          template.textContent = msg;
        let inputParent = input.parentNode;
          template.classList.remove('template');
            inputParent.appendChild(template);
    }
  }

  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}

let form = document.getElementById('form');
let btnPassrest = document.querySelector('.btn-passrest');
let validator = new Validator();

btnPassrest.addEventListener('click', function (event) {
  event.preventDefault();
    validator.validate(form);
});
// === Feedback de envio ===
// --- Redefinir senha --- \\
function resetpass(message, type) {
  iziToast.success({
  title: 'OK',
  message: 'E-mail enviado com sucesso! ✉',
  position: 'bottomCenter',
  timeout: 5000,
  theme: 'dark',
  backgroundColor: type === 'success' ? '#1abc9c' : '#43b633',
  color: '#fff',
  messageSize: '17',
});
  return false
}
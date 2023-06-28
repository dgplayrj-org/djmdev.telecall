// Função de mostrar e ocultar senha e mudar ícone \\
let eyeIcon = document.querySelector('#eye-icon');
let inputSenha = document.querySelector('#pass');

eyeIcon.addEventListener('click', () => {
  if (inputSenha.getAttribute('type') === 'password') {
    inputSenha.setAttribute('type', 'text');
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
    
  } else {
    inputSenha.setAttribute('type', 'password');
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  }
});

// === Lista de validações === \\
class Validator {
  constructor() {
    this.validations = [
      'required',
      'only-letters',
      'min-length',
      'login-length',
      'pass-valid',
      'equal',
    ];
  }
// Limpa as validações anteriores \\
  validate(form) {
    let currentValidations = form.querySelectorAll('.error-validation, .error-active, .error-selc');
      if (currentValidations.length > 0) {
        this.cleanValidations(currentValidations);
    }
    // Obtém os inputs do formulário \\
    let inputs = form.getElementsByTagName('input');
    let inputsArray = [...inputs];
    let isValid = true;
    // Verifica cada input com as validações disponíveis \\
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
    // Exibe mensagem de sucesso se tudo estiver válido \\
    if (isValid) {
      
    }
  }
  // Valida se apenas letras são permitidas no campo \\
  onlyletters(input) {
    let re = /^[A-Za-zÀ-ÿ\s]+$/;
    let inputValue = input.value;
    let errorMessage = 'Este campo não aceita números nem caracteres especiais.';
      if (!re.test(inputValue)) {
        this.printMess(input, errorMessage);
          return false;
    }
    return true;
  }
  // Valida o tamanho mínimo do campo \\
  minlength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `O nome deve conter no mínimo ${minValue} caracteres.`;
      if (inputLength < minValue) {
        this.printMess(input, errorMessage);
          return false;
    }
    return true;
  }
  // Valida o tamanho mínimo do login \\
  loginLength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `O login deve conter no mínimo ${minValue} caracteres alfabéticos.`;
      if (inputLength < minValue) {
        this.printMess(input, errorMessage);
          return false;
    }
    return true;
  }
  // Valida o tamanho máximo do campo \\
  maxlength(input, maxValue) {
    let inputLength = input.value.length;
    let errorMessage = `O nome deve conter no máximo ${maxValue} caracteres.`;
      if (inputLength > maxValue) {
        this.printMess(input, errorMessage);
          return false;
    }
    return true;
  }
  // Valida se o campo é obrigatório \\
  required(input) {
    let inputValue = input.value;
      if (inputValue === '') {
        let errorMessage = 'Este campo é obrigatório!';
          this.printMess(input, errorMessage);
            return false;
    }
    return true;
  }
  // Validação de senha \\
  passvalid(input) {
    let inputValue = input.value;
    let errorMessage = '';
      if (inputValue.length < 8) {
        errorMessage = 'Senha incorreta!!!';
      } else if (!/[A-Z]/.test(inputValue)) {
        
      }
      if (errorMessage !== '') {
        this.printMess(input, errorMessage);
          return false;
    }
    return true;
  }
  // Exibe mensagem de erro para um campo específico \\
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
  // Limpa as mensagens de erro anteriores \\
  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}
// Botões presentes no HTML \\
let form = document.getElementById('form');
let btnSubmit = document.querySelector('.btn-submit');
let validator = new Validator();
// Botão de "Enviar" \\
btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
      validator.validate(form);
});

// Validação de login
function entrar() {
  let user = document.querySelector('#login');
  let pass = document.querySelector('#pass');

  let listaUser = [];

  let userValid = {
    nome: '',
    login: '',
    senha: ''
  };

  listaUser = JSON.parse(localStorage.getItem('listaUser'));

  listaUser.forEach((item) => {
    if (user.value == item.login && pass.value == item.senha) {
      userValid = {
        nome: item.nome,
        login: item.login,
        senha: item.senha
      };
    }
  });

  // Verifica se os campos de login e senha estão vazios
  if (user.value === '' || pass.value === '') {
    iziToast.warning({
      title: 'Por favor, preencha todos os campos!',
      message: '',
      position: 'bottomCenter',
      timeout: 5000,
      color: '#fff',
      backgroundColor: '#f1c40f',
    });
    return;
  }

  if (user.value == userValid.login && pass.value == userValid.senha) {
    iziToast.success({
      title: 'Seja Bem-Vindo(a),',
      message: `${userValid.nome}!`,
      position: 'bottomCenter',
      timeout: 5000,
      theme: 'dark',
      color: '#fff',
      backgroundColor: '#43b633',
    });

    setTimeout(() => {
      window.location.href = '../../../index.html';
    }, 5000);
    // Cria um Token para o usuário
    let token = Math.random().toString(16).substring(2);
    localStorage.setItem('token', token)
    // 
    localStorage.setItem('userLogado', JSON.stringify(userValid))

  } else {
    let errorMessage = '';

    if (pass.value.length < 8) {
      errorMessage = 'Senha incorreta!!!';
    }

    if (errorMessage !== '') {
      iziToast.error({
        title: errorMessage,
        message: '',
        position: 'bottomCenter',
        timeout: 5000,
        theme: 'dark',
        color: '#fff',
        backgroundColor: '#e74c3c',
      });
    } else {
      iziToast.error({
        title: 'Usuário não existe!',
        message: '',
        position: 'bottomCenter',
        timeout: 5000,
        theme: 'dark',
        color: '#fff',
        backgroundColor: '#e74c3c',
      });
    }
    user.focus();
    pass.value = '';
  }
}

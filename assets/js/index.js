function toggleSubmenu(event) {
    if (window.innerWidth <= 991.98) {
        event.preventDefault(); // Impede a ação padrão do link
        var submenu = event.target.parentNode.querySelector('.dropdown-menu');
        submenu.classList.toggle('show'); // Mostra ou esconde o submenu
    }
}

class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 70 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();
// ===================
document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.page-link');
  var mainContent = document.getElementById('main-content');

  // Função para carregar página via AJAX
  // function loadPage(url) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', url, true);
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       mainContent.innerHTML = xhr.responseText;
  //     }
  //   };
  //   xhr.send();
  // }
  
  // Script da "dica de ferramenta" \\
  $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="tooltip"]').on('click', function() {
      $(this).tooltip('hide');
    });
  });

  // Evento de clique nos links do menu
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var pageUrl = this.getAttribute('href');
      loadPage(pageUrl);
    });
  });
});
// === Botão modo Dark === \\
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const htmlElement = document.getElementsByTagName('html')[0];
  const ballElement = document.querySelector('.ball');

  if (toggleButton && htmlElement && ballElement) {
    // Verificar o estado atual do modo escuro no localStorage
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode === 'true') {
      htmlElement.classList.add('dark-mode');
      ballElement.style.transform = 'translateX(24px)';
      toggleButton.checked = true;
    }

    toggleButton.addEventListener('click', function() {
      htmlElement.classList.toggle('dark-mode');
      // Salvar a opção selecionada no localStorage
      if (htmlElement.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'true');
        ballElement.style.transform = 'translateX(24px)';
      } else {
        localStorage.removeItem('darkMode');
        ballElement.style.transform = 'translateX(0)';
      }
    });
  } else {
    console.error('Elementos não encontrados no DOM.');
  }
});
// ==== Área captcha ====
function gerarTextoCaptcha() {
  // Caracteres permitidos para o texto CAPTCHA
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  var textoCaptcha = '';
  for (var i = 0; i < 6; i++) {
    // Obtenha um índice aleatório da lista de caracteres
    var indice = Math.floor(Math.random() * caracteres.length);
    
    // Adicione o caractere aleatório ao texto do CAPTCHA
    textoCaptcha += caracteres.charAt(indice);
  }

  // Obtenha a referência ao elemento de texto
  var elementoTexto = document.querySelector(".captcha");

  // Defina o texto do elemento com o texto CAPTCHA gerado
  elementoTexto.textContent = textoCaptcha;
}

function reiniciarCaptcha() {
  var inputTexto = document.querySelector(".input-area input");
  var statusText = document.querySelector(".status-text");

  inputTexto.value = "";
  statusText.textContent = "";
  
  gerarTextoCaptcha();
}

function verificarCaptcha() {
  var inputTexto = document.querySelector(".input-area input");
  var textoCaptcha = document.querySelector(".captcha").textContent;
  var statusText = document.querySelector(".status-text");

  if (inputTexto.value === textoCaptcha) {
    statusText.textContent = "CAPTCHA verificado com sucesso!";
    statusText.style.color = "green";
  } else {
    statusText.textContent = "CAPTCHA incorreto. Tente novamente.";
    statusText.style.color = "red";
  }
}
// ==== User Logado ==== \\
function sair() {
  localStorage.removeItem('token');
  localStorage.removeItem('userLogado');
  window.location.href = './assets/html/access/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  let userLogado = JSON.parse(localStorage.getItem('userLogado'));
  let username = document.querySelector('#username');
  let logoutBtn = document.querySelector('#logoutBtn');
  let userLink = document.querySelector('#userLink');

  if (userLogado) {
    username.innerHTML = userLogado.login;
    logoutBtn.classList.remove('hide');
    userLink.removeAttribute('href');
    userLink.style.cursor = 'default';
  } else {
    username.innerHTML = 'Usuário';
    logoutBtn.classList.add('hide');
    userLink.setAttribute('href', './assets/html/access/login.html');
    userLink.style.cursor = 'pointer';
  }
});


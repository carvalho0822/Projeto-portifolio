const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema (com verificação de existência)
if (botao) {
  const temasalvo = localStorage.getItem('tema');
  temaEscuro(temasalvo === 'escuro');

  // Função para alternar entre tema claro e escuro
  function temaEscuro(tipo) {
    if (tipo == true) {
      body.classList.add('escuro');
      botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove('escuro');
      botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  botao.addEventListener('click', () => {
    const isescuro = body.classList.toggle('escuro');
    temaEscuro(isescuro);
    localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
  });
}

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CARROSSEL DE PROJETOS =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const carouselSlides = document.querySelector('.carousel-slides');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

console.log('Total de slides:', totalSlides);
console.log('PrevBtn:', prevBtn);
console.log('NextBtn:', nextBtn);

function showSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  const offset = currentSlide * 100;
  console.log('Mostrando slide:', currentSlide, 'offset:', offset + '%');
  carouselSlides.style.transform = `translateX(-${offset}%)`;
  
  // Atualizar indicadores
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  console.log('Próximo slide');
  showSlide(currentSlide + 1);
}

function prevSlide() {
  console.log('Slide anterior');
  showSlide(currentSlide - 1);
}

// Event listeners para botões
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Clicar nos indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    showSlide(index);
  });
});

// Inicializar carrossel
showSlide(0);
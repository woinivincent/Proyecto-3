

// Función para obtener el contador de elementos en el carrito y mostrarlo en la interfaz
export function updateUserCount() {
    const userCount = document.querySelector(".user-count");
    const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    userCount.textContent = carrito.length;
}

// Función principal que inicializa el slider
export function initSlider() {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let counter = 0;
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = slides.length;
    const autoSlideInterval = 5000;

    // Configurar la transición
    slides.forEach((slide) => {
        slide.style.transition = 'transform 0.5s ease';
    });

    // Función para mostrar el siguiente slide
    function nextSlide() {
        counter = counter < totalSlides - 1 ? counter + 1 : 0;
        updateSlider();
    }

    // Función para mostrar el slide anterior
    function prevSlide() {
        counter = counter > 0 ? counter - 1 : totalSlides - 1;
        updateSlider();
    }

    // Función para actualizar el slider según el contador
    function updateSlider() {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        });
    }

    // Agregar event listeners a los botones de navegación
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Configurar el temporizador para el cambio automático de slides
    let autoSlideTimer = setInterval(nextSlide, autoSlideInterval);

    // Detener el slider al pasar el mouse sobre él
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideTimer);
    });

    // Reanudar el slider al sacar el mouse del slider
    slider.addEventListener('mouseleave', () => {
        autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
    });
}
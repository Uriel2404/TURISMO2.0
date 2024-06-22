let currentIndex = 1;

function updateCarousel() {
    const items = document.querySelectorAll('.carouse-item');
    const totalItems = items.length;

    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
    });

    const wrapper = document.querySelector('.carousel-wrappe');
    const carouselWidth = wrapper.scrollWidth;
    const itemWidth = items[0].offsetWidth;
    const offset = -(currentIndex * (carouselWidth / totalItems) - (carouselWidth / totalItems / 2) - itemWidth / 2);
    wrapper.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    const items = document.querySelectorAll('.carouse-item');
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    const items = document.querySelectorAll('.carouse-item');
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    // Tu código existente aquí...

    // Evento de teclado para desplazamiento del carrusel
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            prevSlide(); // Función para desplazar al slide anterior
        } else if (event.key === 'ArrowRight') {
            nextSlide(); // Función para desplazar al slide siguiente
        } else if (event.key === 'i' || event.key === 'I') {
            toggleInfo('info'); // Función para mostrar u ocultar la información
        }
    });
});


function handleScroll() {
    const inicioSection = document.getElementById('inicio-section');
    const inicioLink = document.getElementById('inicio-link');
    const lugaresSection = document.getElementById('lugares-section');
    const lugaresLink = document.getElementById('lugares-link');
    const nuevaSection = document.getElementById('nueva-section');
    const contactanosSection = document.getElementById('contactanos-section');
    const contactanosLink = document.getElementById('contactanos-link');
    const sections = [
        { section: inicioSection, link: inicioLink, activeClass: 'inicio-active' },
        { section: lugaresSection, link: lugaresLink, activeClass: 'lugares-active' },
        { section: nuevaSection, link: lugaresLink, activeClass: 'nueva-active' }, 
        { section: contactanosSection, link: contactanosLink, activeClass: 'contactanos-active' }
    ];

    let isLugaresLinkActive = false;

    sections.forEach(({ section, link, activeClass }) => {
        const sectionRect = section.getBoundingClientRect();

        if (sectionRect.top <= window.innerHeight / 2 && sectionRect.bottom >= window.innerHeight / 2) {
            section.classList.add(activeClass);
            if (link) link.classList.add('active');
            if (link === lugaresLink) isLugaresLinkActive = true;
        } else {
            section.classList.remove(activeClass);
            if (link && link !== lugaresLink) link.classList.remove('active');
        }
    });

    if (isLugaresLinkActive) {
        lugaresLink.classList.add('active');
    } else {
        lugaresLink.classList.remove('active');
    }
}

function toggleInfo(id) {
    const info = document.getElementById(id);
    if (info.style.display === "none" || info.style.display === "") {
        info.style.display = "block";
        updateNavLink(id); // Activa el enlace de navegación correspondiente
    } else {
        info.style.display = "none";
    }
}


function updateNavLink(id) {
    const lugaresLink = document.getElementById('lugares-link');
    const nuevaLink = document.getElementById('nueva-link'); // Añadimos la selección de nueva-link
    lugaresLink.classList.remove('active');
    nuevaLink.classList.remove('active');
    switch (id) {
        case 'info':
            lugaresLink.classList.add('active');
            break;
        case 'info-nueva':
            nuevaLink.classList.add('active');
            break;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});

document.addEventListener('DOMContentLoaded', () => {
    const socialBar = document.getElementById('social-bar');
    let lastScrollTop = 0;
    const threshold = 50;

    function handleScroll() {
        const inicioSection = document.getElementById('inicio-section');
        const lugaresSection = document.getElementById('lugares-section');
        const nuevaSection = document.getElementById('nueva-section');
        const contactanosSection = document.getElementById('contactanos-section');
        const inicioLink = document.getElementById('inicio-link');
        const lugaresLink = document.getElementById('lugares-link');
        const contactanosLink = document.getElementById('contactanos-link');

        const sections = [
            { section: inicioSection, link: inicioLink },
            { section: lugaresSection, link: lugaresLink },
            { section: nuevaSection, link: lugaresLink }, 
            { section: contactanosSection, link: contactanosLink }
        ];

        let isLugaresActive = false;

        sections.forEach(({ section, link }) => {
            if (isSectionInView(section)) {
                link.classList.add('active');
                if (link === lugaresLink) isLugaresActive = true;
            } else {
                link.classList.remove('active');
            }
        });

        if (isLugaresActive) {
            lugaresLink.classList.add('active');
        } else {
            lugaresLink.classList.remove('active');
        }
    }

    function isSectionInView(section) {
        const sectionRect = section.getBoundingClientRect();
        return (
            sectionRect.top >= 0 &&
            sectionRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop + threshold) {
            socialBar.classList.add('hidden');
        } else if (st < lastScrollTop - threshold) {
            socialBar.classList.remove('hidden');
        }

        lastScrollTop = st <= 0 ? 0 : st; // Evita valores negativos en el scroll superior

        handleScroll(); // Llamar a la función para actualizar el estado de los enlaces de navegación
    });

    handleScroll(); // Llamar a la función para inicializar el estado correcto al cargar la página
});
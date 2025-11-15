document.addEventListener('DOMContentLoaded', () => {

    // logica del slider del equipo
    const teamList = document.querySelector('.team-list');
    const members = document.querySelectorAll('.team-member');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (teamList && members.length > 0 && prevBtn && nextBtn) {
        let membersToShow = 3; // cuantos miembros mostrar a la vez
        let totalMembers = members.length;
        let memberWidth = members[0].offsetWidth + 20; // ancho + margen (10px a cada lado)
        let currentIndex = 0;

        function updateSliderConfig() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 600) {
                membersToShow = 1;
            } else if (screenWidth <= 992) {
                membersToShow = 2;
            } else {
                membersToShow = 3;
            }
            
            // Recalcular el ancho del item (por si acaso)
            // Primero, ajusta el CSS para que los items tengan el ancho correcto
            const itemWidthPercentage = 100 / membersToShow;
            members.forEach(member => {
                member.style.flexBasis = `calc(${itemWidthPercentage}% - 20px)`;
                member.style.maxWidth = `calc(${itemWidthPercentage}% - 20px)`;
            });

            // Luego recalcula el ancho en JS
            memberWidth = teamList.offsetWidth / membersToShow;
            
            // Resetea el índice si se pasa
            if (currentIndex > totalMembers - membersToShow) {
                currentIndex = 0;
            }
            
            updateSliderPosition();
        }

        function updateSliderPosition() {
            teamList.style.transform = `translateX(-${currentIndex * memberWidth}px)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalMembers - membersToShow;
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalMembers - membersToShow) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        // Inicializar estado de botones
        updateSliderPosition();

        // Manejar redimensionamiento de ventana
        updateSliderConfig();

        // Actualizar configuración al redimensionar
        window.addEventListener('resize', updateSliderConfig);
    }

    // Lógica de Animación al Scroll (Intersection Observer) 
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

    if (sectionsToAnimate.length > 0) {
        const observerOptions = {
            root: null, // ve la intersección con el viewport
            rootMargin: '0px',
            threshold: 0.1 // Se activa cuando al menos el 10% es visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // --- INICIO: LÓGICA DEL MENÚ MÓVIL (AÑADE ESTO) ---
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const mainHeader = document.querySelector('.main-header');
    
    if (toggleButton && mainHeader) {
        toggleButton.addEventListener('click', () => {
            // Alterna la clase 'nav-open' en el <header>
            mainHeader.classList.toggle('nav-open');
            
            // Actualiza el atributo aria-expanded para accesibilidad
            const isExpanded = mainHeader.classList.contains('nav-open');
            toggleButton.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Opcional: Cierra el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo si el menú está abierto
            if (mainHeader.classList.contains('nav-open')) {
                mainHeader.classList.remove('nav-open');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
    // --- FIN: LÓGICA DEL MENÚ MÓVIL ---

}); 
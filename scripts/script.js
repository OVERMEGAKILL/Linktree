// Application principale
const App = {
    // Initialisation des fonctionnalit�s
    init() {
        this.showConsentPanel(); // Afficher le panneau de consentement
        this.initMouseEffect(); // Animation de la souris
        this.startLinkAnimations(); // Animation des liens
    },

    // Afficher le panneau de consentement audio au chargement de la page
    showConsentPanel() {
        const overlay = document.getElementById('overlay');
        const audioConsentPanel = document.getElementById('audio-consent-panel');
        const acceptButton = document.getElementById('accept-audio');
        const declineButton = document.getElementById('decline-audio');
        const audio = document.getElementById('audio-element');

        if (!overlay || !audioConsentPanel || !acceptButton || !declineButton || !audio) return; // S�curit�

        // Afficher le panneau de consentement
        overlay.style.display = 'flex';

        // Gestion du bouton "Accepter"
        acceptButton.addEventListener('click', () => {
            overlay.style.display = 'none'; // Masquer l'overlay
            audio.play(); // Lancer l'audio
        });

        // Gestion du bouton "Refuser"
        declineButton.addEventListener('click', () => {
            overlay.style.display = 'none'; // Masquer l'overlay
            audio.pause(); // S'assurer que l'audio reste d�sactiv�
        });
    },

    // Effet de rotation bas� sur les mouvements de la souris
    initMouseEffect() {
        const container = document.querySelector('.container');
        if (!container) return; // V�rification si l'�l�ment existe

        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 20;
            const y = (window.innerHeight / 2 - e.pageY) / 20;

            // Utilisation de requestAnimationFrame pour une animation fluide
            requestAnimationFrame(() => {
                container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
            });
        });
    },

    // Animation des liens
    startLinkAnimations() {
        const links = document.querySelectorAll('.link-text');
        if (!links) return; // V�rification si les �l�ments existent

        // Fonction pour cr�er un effet de texte dynamique
        links.forEach((link, index) => {
            setTimeout(() => {
                typeEffect(link, link.getAttribute('data-text'));
            }, index * 4000); // Espacement dans le temps pour chaque lien
        });

        // R�p�ter l'animation � intervalles r�guliers
        setInterval(() => {
            links.forEach((link) => {
                link.style.opacity = 0; // Effet de transition
                setTimeout(() => {
                    link.style.opacity = 1;
                    typeEffect(link, link.getAttribute('data-text'));
                }, 500);
            });
        }, 10000); // R�p�te toutes les 10 secondes
    },
};

// Effet de saisie lettre par lettre
function typeEffect(element, text) {
    if (!element || !text) return; // V�rification des param�tres

    element.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
    changeFontLetterByLetter(element, ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'], 100);
}

// Changement de police lettre par lettre
function changeFontLetterByLetter(element, fonts, delay = 300) {
    const spans = element.querySelectorAll('span');
    if (!spans) return; // V�rification

    let i = 0;
    const interval = setInterval(() => {
        if (i < spans.length) {
            spans[i].style.fontFamily = fonts[0];
            i++;
        } else {
            clearInterval(interval);
            if (fonts.length > 1) {
                setTimeout(() => {
                    changeFontLetterByLetter(element, fonts.slice(1), delay);
                }, 500);
            }
        }
    }, delay);
}

// Initialiser l'application une fois la page charg�e
window.onload = () => App.init();

// Application principale
const App = {
    // Initialisation des fonctionnalit�s
    init() {
        this.initMouseEffect(); // Animation de la souris
        this.initAudioControls(); // Contr�le de l'audio
        this.startLinkAnimations(); // Animation des liens
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

    // Contr�le de l'audio avec fond semi-transparent
    initAudioControls() {
        const audio = document.getElementById('audio-element');
        const playButton = document.getElementById('play-audio');
        const pauseButton = document.getElementById('pause-audio');
        const slider = document.getElementById('audio-slider');
        const overlay = document.getElementById('overlay');
        const closeButton = document.getElementById('close-overlay');

        if (!audio || !playButton || !pauseButton || !slider || !overlay || !closeButton) return; // V�rification des �l�ments

        // Demande de confirmation pour lancer l'audio
        const userConsent = window.confirm("Voulez-vous activer le lecteur audio�?");
        if (userConsent) {
            audio.play();
            overlay.style.display = 'block'; // Afficher le fond semi-transparent
        } else {
            audio.pause();
        }

        // Lancer la lecture
        playButton.addEventListener('click', () => {
            audio.play();
            overlay.style.display = 'block'; // Afficher l'overlay lors de la lecture
        });

        // Mettre en pause
        pauseButton.addEventListener('click', () => {
            audio.pause();
            overlay.style.display = 'none'; // Masquer l'overlay lors de la pause
        });

        // Mise � jour du slider pendant la lecture
        audio.addEventListener('timeupdate', () => {
            slider.value = audio.currentTime;
        });

        // Synchroniser l'audio avec le slider
        slider.addEventListener('input', (e) => {
            audio.currentTime = e.target.value;
        });

        // Ajuster la dur�e du slider apr�s le chargement des m�tadonn�es
        audio.addEventListener('loadedmetadata', () => {
            slider.max = audio.duration;
        });

        // G�rer la fermeture de l'overlay
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
            audio.pause(); // Met l'audio en pause si l'overlay est ferm� manuellement
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

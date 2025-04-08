// Application principale
const App = {
    // Initialisation des fonctionnalit�s
    init() {
        this.showConsentPanel(); // Afficher le panneau de consentement
        this.initMouseEffect(); // Animation de la souris
        this.initAudioControls(); // Contr�le de l'audio
        this.startLinkAnimations(); // Animation des liens
    },

    // Afficher le panneau de consentement audio au chargement de la page
    showConsentPanel() {
        const overlay = document.getElementById('overlay'); // Panneau principal
        const acceptButton = document.getElementById('accept-audio'); // Bouton Accepter
        const declineButton = document.getElementById('decline-audio'); // Bouton Refuser
        const audio = document.getElementById('audio-element'); // �l�ment audio

        // V�rification des �l�ments requis
        if (!overlay || !acceptButton || !declineButton || !audio) {
            console.error("Un ou plusieurs �l�ments requis sont introuvables !");
            return;
        }

        // Afficher le panneau de consentement
        overlay.style.display = 'flex';

        // Gestion du bouton "Accepter"
        acceptButton.addEventListener('click', () => {
            overlay.style.display = 'none'; // Masquer le panneau
            audio.play(); // Lancer la musique
            console.log("Audio activ� !");
        });

        // Gestion du bouton "Refuser"
        declineButton.addEventListener('click', () => {
            overlay.style.display = 'none'; // Masquer le panneau
            audio.pause(); // Ne pas d�marrer la musique
            console.log("Audio refus� !");
        });
    },

    // Effet de rotation bas� sur les mouvements de la souris
    initMouseEffect() {
        const container = document.querySelector('.container');
        if (!container) return;

        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 20;
            const y = (window.innerHeight / 2 - e.pageY) / 20;

            requestAnimationFrame(() => {
                container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
            });
        });
    },

    // Contr�le du lecteur audio
	/*initAudioControls() {
        const audio = document.getElementById('audio-element');
        const playPauseButton = document.getElementById('play-pause-audio');
        const slider = document.getElementById('audio-slider');

        // V�rification des �l�ments requis
        if (!audio || !playPauseButton || !slider) {
            console.error("Le lecteur audio ou ses contr�les ne sont pas correctement configur�s !");
            return;
        }

        // Basculer entre lecture et pause
        playPauseButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = 'Pause'; // Changer le bouton en Pause
                playPauseButton.setAttribute('aria-label', 'Pause');
                console.log("Lecture audio d�marr�e !");
            } else {
                audio.pause();
                playPauseButton.textContent = 'Play'; // Changer le bouton en Play
                playPauseButton.setAttribute('aria-label', 'Play');
                console.log("Lecture audio mise en pause !");
            }
        });

        // Mettre � jour la barre de progression pendant la lecture
        audio.addEventListener('timeupdate', () => {
            slider.value = audio.currentTime;
        });

        // Ajuster la dur�e maximale de la barre apr�s le chargement des m�tadonn�es
        audio.addEventListener('loadedmetadata', () => {
            slider.max = audio.duration;
        });

        // Permettre � l'utilisateur de choisir un moment pr�cis dans la musique
        slider.addEventListener('input', (e) => {
            audio.currentTime = e.target.value;
        });
    },*/
	initAudioControls() {
    const audio = document.getElementById('audio-element');
    const playPauseButton = document.getElementById('play-pause-audio');
    const audioSlider = document.getElementById('audio-slider');
    const volumeSlider = document.getElementById('volume-slider');

    // V�rification des �l�ments requis
    if (!audio || !playPauseButton || !audioSlider || !volumeSlider) {
        console.error("Le lecteur audio ou ses contr�les ne sont pas correctement configur�s !");
        return;
    }

    // Lecture et pause
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause'; // Changer le bouton en Pause
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play'; // Changer le bouton en Play
        }
    });

    // Mise � jour de la barre de progression
    audio.addEventListener('timeupdate', () => {
        audioSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
    });

    // Modification de la position de l'audio avec le slider
    audioSlider.addEventListener('input', (e) => {
        audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    // Ajustement du volume
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
}


    // Animation des liens
    startLinkAnimations() {
        const links = document.querySelectorAll('.link-text');
        if (!links) return;

        links.forEach((link, index) => {
            setTimeout(() => {
                typeEffect(link, link.getAttribute('data-text'));
            }, index * 4000);
        });

        // R�p�ter l'animation � intervalles r�guliers
        setInterval(() => {
            links.forEach((link) => {
                link.style.opacity = 0;
                setTimeout(() => {
                    link.style.opacity = 1;
                    typeEffect(link, link.getAttribute('data-text'));
                }, 500);
            });
        }, 10000);
    },
};

// Effet de saisie lettre par lettre
function typeEffect(element, text) {
    if (!element || !text) return;

    element.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
    changeFontLetterByLetter(element, ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'], 100);
}

// Changement de police lettre par lettre
function changeFontLetterByLetter(element, fonts, delay = 300) {
    const spans = element.querySelectorAll('span');
    if (!spans) return;

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

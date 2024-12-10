document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.container');
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

function typeEffect(element, text) {
    element.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
    changeFontLetterByLetter(element, ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'], 100);
}

function changeFontLetterByLetter(element, fonts, delay = 300) {
    const spans = element.querySelectorAll('span');
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

function animateLinks() {
    const links = document.querySelectorAll('.link-text, .glitch');
    links.forEach((link, index) => {
        const originalText = link.getAttribute('data-text');
        const originalHTML = link.innerHTML; // Enregistrer le HTML original pour réafficher les logos
        link.innerHTML = originalText; // Afficher le texte initialement
        setTimeout(() => {
            link.innerHTML = ''; // Effacer le texte avant de réécrire
            typeEffect(link, originalText);
            setTimeout(() => {
                link.innerHTML = originalHTML; // Réafficher les logos après l'animation
            }, (originalText.length * 100 + fonts.length * 300 + 500));
        }, index * 5000);
    });
}

function startAnimation() {
    animateLinks();
    setInterval(() => {
        const links = document.querySelectorAll('.link-text, .glitch');
        links.forEach(link => {
            link.style.transition = 'opacity 0.5s';
            link.style.opacity = 0;
            setTimeout(() => {
                link.style.opacity = 1;
                const originalText = link.getAttribute('data-text');
                const originalHTML = link.innerHTML; // Enregistrer le HTML original pour réafficher les logos
                link.innerHTML = ''; // Effacer le texte avant de réécrire
                typeEffect(link, originalText);
                setTimeout(() => {
                    link.innerHTML = originalHTML; // Réafficher les logos après l'animation
                }, (originalText.length * 100 + fonts.length * 300 + 500));
            }, 500);
        });
    }, 9000); // 6 seconds for SAIBA + 3 seconds for animation
}

function requestAudioPermission() {
    const audioElement = document.getElementById('audio-element');
    const audioPlayer = document.getElementById('audio-player');
    
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#000000';
    popup.style.color = '#ffffff';
    popup.style.border = '2px solid #00ff00';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '1000';

    const popupText = document.createElement('p');
    popupText.textContent = "Voulez-vous activer l'audio ?";
    popup.appendChild(popupText);

    const playButton = document.createElement('button');
    playButton.textContent = "Activer";
    playButton.style.marginRight = '10px';
    playButton.style.padding = '10px 20px';
    playButton.style.fontSize = '16px';
    playButton.style.cursor = 'pointer';
    playButton.style.backgroundColor = '#00ff00';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '5px';
    playButton.style.color = '#000000';

    const closeButton = document.createElement('button');
    closeButton.textContent = "X";
    closeButton.style.marginLeft = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.backgroundColor = '#ff0000';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.color = '#ffffff';

    playButton.addEventListener('click', () => {
        audioElement.play().then(() => {
            audioPlayer.classList.remove('hidden');
            popup.remove();
        }).catch(error => {
            console.error('Erreur lors de la lecture audio:', error);
        });
    });

    closeButton.addEventListener('click', () => {
        popup.remove();
    });

    popup.appendChild(playButton);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

window.onload = () => {
    startAnimation();
    requestAudioPermission();
    
    const audioElement = document.getElementById('audio-element');
    const playButton = document.getElementById('play-audio');
    const pauseButton = document.getElementById('pause-audio');
    const audioSlider = document.getElementById('audio-slider');

    playButton.addEventListener('click', () => {
        audioElement.play();
    });

    pauseButton.addEventListener('click', () => {
        audioElement.pause();
    });

    audioElement.addEventListener('timeupdate', () => {
        audioSlider.max = audioElement.duration;
        audioSlider.value = audioElement.currentTime;
    });

    audioSlider.addEventListener('input', () => {
        audioElement.currentTime = audioSlider.value;
    });
};

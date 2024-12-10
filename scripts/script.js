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
        const originalHTML = link.innerHTML; // Enregistrer le HTML original
        link.innerHTML = originalText; // Afficher le texte initialement
        setTimeout(() => {
            link.innerHTML = ''; // Effacer le texte avant de réécrire
            typeEffect(link, originalText);
            setTimeout(() => {
                link.innerHTML = originalHTML; // Réafficher le HTML original
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
                const originalHTML = link.innerHTML; // Enregistrer le HTML original
                link.innerHTML = ''; // Effacer le texte avant de réécrire
                typeEffect(link, originalText);
                setTimeout(() => {
                    link.innerHTML = originalHTML; // Réafficher le HTML original
                }, (originalText.length * 100 + fonts.length * 300 + 500));
            }, 500);
        });
    }, 9000); // 6 seconds for SAIBA + 3 seconds for animation
}

function requestAudioPermission() {
    const audioElement = document.getElementById('audio-element');
    const playButton = document.createElement('button');
    playButton.textContent = "Cliquez ici pour activer l'audio";
    playButton.style.position = 'fixed';
    playButton.style.top = '50%';
    playButton.style.left = '50%';
    playButton.style.transform = 'translate(-50%, -50%)';
    playButton.style.padding = '10px 20px';
    playButton.style.fontSize = '16px';
    playButton.style.backgroundColor = '#00ff00';
    playButton.style.color = '#000';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '5px';
    playButton.style.cursor = 'pointer';
    playButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    playButton.style.zIndex = 1000;

    playButton.addEventListener('click', () => {
        audioElement.play().then(() => {
            playButton.remove();
        }).catch(error => {
            console.error('Erreur lors de la lecture audio:', error);
        });
    });

    document.body.appendChild(playButton);
}

window.onload = () => {
    startAnimation();
    requestAudioPermission();
};

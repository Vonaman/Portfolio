const title = document.querySelector("h1")
const letters = [...document.querySelectorAll("h1 span")]

title.addEventListener("mouseenter", handleLetters);
title.addEventListener("mouseleave", handleLetters);

let isAnimatingIn = false;
let calledOut = false;
let animOpened = false;

function handleLetters(){

  if(animOpened){
    animOut();
    animOpened = false;
    return;
  }

  if(isAnimatingIn){
    calledOut = true;
    return;
  }

  isAnimatingIn = true

  const animPromise = new Promise((resolve) => {
    animIn()
    setTimeout(() => {
      resolve()
    }, 750)
  })
  animPromise.then(() => {
isAnimatingIn = false;

    if(calledOut){
      animOut();
      calledOut = false;
    } else if (!calledOut){
      animOpened = true;
    }
  })
} 

function animIn(){
  anime({
    targets : "h1 span",
    translateX : function(){
      return anime.random(-250,250)
    },
    translateY : function(){
      return anime.random(-250,250)
    },
    translateZ : function(){
      return anime.random(-2000,750)
    },
    rotate : function(){
      return anime.random(-250,250)
    },
    easing: "easeOutCirc",
    duration: 750,
  })
}

function animOut(){
  anime({
    targets : "h1 span",
    translateX : 0,
    translateY : 0,
    translateZ : 0,
    rotate : 0,
    easing: "easeInQuad",
    duration: 750,
  })
}

const btnScroll = document.getElementById("btn-scroll");
const body = document.body;

function clickScroll() {

  if (body.classList.contains("overflow-hidden")) {
    body.classList.remove("overflow-hidden");
    body.classList.remove("overflow-hidden");
    console.log(document.body.classList);

  }

  setTimeout(() => {
    document.getElementById("propos").scrollIntoView({ behavior: "smooth" });
  }, 50);
}


/*Apparition texte propos*/
document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("propos");
  const proposGauche = document.getElementById("propos-gauche");
  const proposDroit = document.getElementById("propos-droit");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatePropos(); // Déclenche l’animation
        observer.unobserve(target); // Désactive l'observation après l'animation
        proposDroit.classList.remove("opacity-0")
        proposGauche.classList.remove("opacity-0")
      }
    });
  }, { threshold: 0.3 }); // Déclenche quand 30% de la div est visible

  observer.observe(target);
});

function animatePropos() {
  anime({
    targets: "#propos-gauche",
    opacity: [0, 1],
    translateX: [-100, 0],
    easing: "easeOutExpo",
    duration: 1000,
    daley: 200,
  });

  anime({
    targets: "#propos-droit",
    opacity: [0, 1],
    translateX: [100, 0],
    easing: "easeOutExpo",
    duration: 1000,
    delay: 400, // Petit décalage pour un effet fluide
  });
}


// ticker

const images = [...document.querySelectorAll(".carrousel img")]
const carrousel = document.getElementById("carrousel")

// 2️⃣ Cloner les images pour éviter le vide à la fin
images.forEach(img => {
  let clone = img.cloneNode(true);
  carrousel.appendChild(clone);
});

// 3️⃣ Anime.js pour l'animation infinie
anime({
  targets: ".carrousel img",
  translateX: ["0%", "-1870%"], // Déplace les images vers la gauche
  duration: 15000, // Durée de l'animation (modifiable)
  easing: "linear", // Animation fluide et constante
  loop: true, // Répète à l'infini
});


/*Projet */

let currentIndex = 0;
const cards = document.querySelectorAll('.content');
const totalCards = cards.length;

function updateCarrousel() {
    cards.forEach((card, index) => {
        if (index === currentIndex) {
            // Afficher uniquement la carte active
            anime({
                targets: card,
                translateX: 0,
                opacity: 1,
                scale: 1,
                zIndex: 10,
                easing: "easeInOutQuad",
                duration: 600
            });
        } else {
            // Cacher complètement les autres cartes
            // Les positionner hors écran mais du bon côté pour l'animation
            const direction = index < currentIndex ? -1 : 1;
            anime({
                targets: card,
                translateX: direction * window.innerWidth + 'px', // Complètement hors écran
                opacity: 0,
                scale: 0.8,
                zIndex: 0,
                easing: "easeInOutQuad",
                duration: 600
            });
        }
    });
    
    // Ajuster la hauteur du conteneur
    const activeCard = cards[currentIndex];
    const container = document.getElementById('carrousel');
    if (container && activeCard) {
        anime({
            targets: container,
            height: activeCard.offsetHeight + 40 + 'px',
            duration: 600,
            easing: "easeInOutQuad"
        });
    }
}

// Navigation à gauche avec boucle infinie
window.goLeft = function() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    
    // Préparer la carte qui va apparaître
    const newActiveCard = cards[currentIndex];
    newActiveCard.style.transform = 'translateX(-100%)';
    newActiveCard.style.opacity = '0';
    newActiveCard.style.zIndex = '5';
    
    // Petite pause pour permettre au navigateur d'appliquer ces styles
    setTimeout(() => {
        updateCarrousel();
    }, 10);
};

// Navigation à droite avec boucle infinie
window.goRight = function() {
    currentIndex = (currentIndex + 1) % totalCards;
    
    // Préparer la carte qui va apparaître
    const newActiveCard = cards[currentIndex];
    newActiveCard.style.transform = 'translateX(100%)';
    newActiveCard.style.opacity = '0';
    newActiveCard.style.zIndex = '5';
    
    // Petite pause pour permettre au navigateur d'appliquer ces styles
    setTimeout(() => {
        updateCarrousel();
    }, 10);
};

// Initialiser le carrousel
document.addEventListener('DOMContentLoaded', function() {
    // Cacher toutes les cartes sauf la première
    cards.forEach((card, index) => {
        if (index !== 0) {
            card.style.opacity = '0';
            card.style.transform = 'translateX(100%)';
            card.style.zIndex = '0';
        } else {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
            card.style.zIndex = '10';
        }
    });
    
    // Positionnement initial
    updateCarrousel();
    
    // Gestion des événements tactiles
    let touchStartX = 0;
    const carousel = document.getElementById('carrousel');
    
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Seuil de sensibilité
            if (diff > 0) {
                window.goRight();
            } else {
                window.goLeft();
            }
        }
    });
});

/* Experience 1*/

document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("exp-gauche-1");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateExpGauche1(); // Déclenche l’animation
        observer.unobserve(target); // Désactive l'observation après l'animation
        target.classList.remove("opacity-0")
      }
    });
  }, { threshold: 0.3 }); // Déclenche quand 30% de la div est visible

  observer.observe(target);
});

function animateExpGauche1() {
  anime({
    targets: "#exp-gauche-1",
    opacity: [0, 1],
    translateX: [-300, 0],
    easing: "easeOutExpo",
    duration: 2000,
    daley: 200,
  });
}

/* Exp2 */
document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("exp-droite-1");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateExpDroite1(); // Déclenche l’animation
        observer.unobserve(target); // Désactive l'observation après l'animation
        target.classList.remove("opacity-0")
      }
    });
  }, { threshold: 0.3 }); // Déclenche quand 30% de la div est visible

  observer.observe(target);
});

function animateExpDroite1() {
  anime({
    targets: "#exp-droite-1",
    opacity: [0, 1],
    translateX: [300, 0],
    easing: "easeOutExpo",
    duration: 2000,
    daley: 200,
  });
}

/* Exp3 */

document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("exp-gauche-2");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateExpGauche2(); // Déclenche l’animation
        observer.unobserve(target); // Désactive l'observation après l'animation
        target.classList.remove("opacity-0")
      }
    });
  }, { threshold: 0.3 }); // Déclenche quand 30% de la div est visible

  observer.observe(target);
});

function animateExpGauche2() {
  anime({
    targets: "#exp-gauche-2",
    opacity: [0, 1],
    translateX: [-300, 0],
    easing: "easeOutExpo",
    duration: 2000,
    daley: 200,
  });
}
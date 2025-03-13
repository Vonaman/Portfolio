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

const cards = document.querySelectorAll("#carrousel .content");
let currentIndex = 0; // L'index de la carte actuelle

function updateCarrousel() {
    anime({
        targets: cards,
        translateX: (el, i) => (i - currentIndex) * window.innerWidth * 0.8,
        opacity: (el, i) => (i === currentIndex ? 1 : 0.5), // La carte centrale est bien visible
        scale: (el, i) => (i === currentIndex ? 1 : 0.2), // La carte centrale est plus grande
        easing: "easeInOutQuad",
        duration: 600,
    });
}

// Fait défiler vers la gauche
window.goLeft = function () {
  if (currentIndex > 0) {
      currentIndex--;
      updateCarrousel();
  }
};

// Fait défiler vers la droite
function goRight() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarrousel();
    }
}

// Initialise le carrousel
updateCarrousel();


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
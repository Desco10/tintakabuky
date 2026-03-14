document.addEventListener("DOMContentLoaded", function () {

  //* =========================
   //HERO MULTICOLOR DINÁMICO
//========================= */

/* =========================
   HERO PREMIUM INTERACTIVO
========================= */

const heroProduct = document.getElementById("heroProduct");
const heroOverlay = document.querySelector(".hero-overlay");

/* Colores atmósfera */
const heroColors = [
  "linear-gradient(135deg, rgba(255,59,111,0.65), rgba(255,179,198,0.45))",
  "linear-gradient(135deg, rgba(186,85,211,0.65), rgba(37, 29, 33, 0.45))",
  "linear-gradient(135deg, rgba(25, 24, 23, 0.8), rgba(255,69,0,0.45))",
  "linear-gradient(135deg, rgba(194,24,91,0.65), rgba(240,98,146,0.45))"
];

let colorIndex = -1;

heroProduct.addEventListener("click", () => {

  /* Cambio instantáneo */
  colorIndex = (colorIndex + 1) % (heroColors.length + 1);

  if (colorIndex < heroColors.length) {
    heroOverlay.style.background = heroColors[colorIndex];
  } else {
    heroOverlay.style.background =
      "linear-gradient(135deg, rgba(255,59,111,0.55), rgba(255,179,198,0.35))";
  }

  /* Animación 3D rápida */
  heroProduct.classList.remove("click-animate");
  void heroProduct.offsetWidth; // fuerza reflow inmediato
  heroProduct.classList.add("click-animate");

});
  
/* =====================
   CARRUSEL 3D
===================== */

const items = document.querySelectorAll(".carousel-item");

let index = 0;
let interval;

/* =====================
   ACTUALIZAR POSICIONES
===================== */

function updateCarousel(){

  items.forEach(item=>{
    item.classList.remove(
      "active",
      "left",
      "right",
      "back-left",
      "back-right"
    );
  });

  const total = items.length;

  const center = index;
  const left = (index-1+total)%total;
  const right = (index+1)%total;
  const backLeft = (index-2+total)%total;
  const backRight = (index+2)%total;

  items[center].classList.add("active");
  items[left].classList.add("left");
  items[right].classList.add("right");
  items[backLeft].classList.add("back-left");
  items[backRight].classList.add("back-right");

}

/* =====================
   SIGUIENTE
===================== */

function nextSlide(){

  index = (index + 1) % items.length;

  

  updateCarousel();
  setTimeout(()=>{
  document.querySelector(".carousel-track").style.opacity = "1";
},200);

}

/* =====================
   AUTOPLAY
===================== */

function startCarousel(){

  interval = setInterval(nextSlide,3800);

}

updateCarousel();
startCarousel();

/* =====================
   CLICK ZOOM
===================== */

items.forEach(item=>{

  item.addEventListener("click",(e)=>{

    e.stopPropagation();

    if(item.classList.contains("zoomed")){

      item.classList.remove("zoomed");

      startCarousel();

    }else{

      items.forEach(i=>i.classList.remove("zoomed"));

      item.classList.add("zoomed");

      clearInterval(interval);

    }

  });

});

/* cerrar zoom */

document.addEventListener("click",()=>{

  items.forEach(i=>i.classList.remove("zoomed"));

  clearInterval(interval);
  startCarousel();

});


  /* =========================
     CAMBIO DE PRESENTACIÓN
  ========================= */
 window.cambiarProducto = function(img){

const mainProduct = document.getElementById("mainProduct");

if(!mainProduct) return;

mainProduct.style.opacity = "0";

setTimeout(()=>{

mainProduct.src = img.src;

mainProduct.style.opacity = "1";

},200);

};


document.querySelectorAll(".thumbnails img").forEach(img => {

img.addEventListener("click", function(){

const mainProduct = document.getElementById("mainProduct");

document.querySelectorAll(".thumbnails img")
.forEach(i => i.classList.remove("active"));

this.classList.add("active");

mainProduct.style.opacity="0";

setTimeout(()=>{
mainProduct.src = this.src;
mainProduct.style.opacity="1";
},200);

});

});
  /* =========================
     TOGGLE INFO PRODUCTO
  ========================= */
  window.toggleInfo = function () {
    const info = document.getElementById("infoDetalle");
    if (info) {
      info.classList.toggle("hidden");
    }
  };


  /* =========================
     CARGAR PRECIOS JSON
  ========================= */
  async function cargarPrecios() {
    try {
      const res = await fetch("productos.json");
      const data = await res.json();

      document.getElementById("precioDetal").innerText =
        "$" + data.precios.detal.precio;

      document.getElementById("precioMayor").innerText =
        "$" + data.precios.mayor.precio;

    } catch (error) {
      console.error("Error cargando precios:", error);
    }
  }

  window.comprar = function (tipo) {
    fetch("productos.json")
      .then(res => res.json())
      .then(data => {
        const mensaje = data.precios[tipo].mensaje;
        window.open(
          `https://wa.me/3246030396?text=${encodeURIComponent(mensaje)}`,
          "_blank"
        );
      });
  };

  cargarPrecios();

});



/* =========================
   SCROLL REVEAL PREMIUM
========================= */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    }

  });

},{
  threshold:0.18
});

reveals.forEach(el=>observer.observe(el));


/* pausa carrusel al hover */

const carousel = document.querySelector(".carousel-3d");

carousel.addEventListener("mouseenter",()=>{
clearInterval(interval);
});

carousel.addEventListener("mouseleave",()=>{
startCarousel();
});
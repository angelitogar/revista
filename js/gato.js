import { Trie } from "./trie.js";
let trie = new Trie();
let jugadoresMap = new Map();
const tiempo = document.getElementById("tiempo");
const celdas = document.querySelectorAll(".celda");
const chivas = 5;
const prohibidos = new Set([12, 13, 14]);
const indicesInput = [4, 5, 6, 8, 9, 10, 12, 13, 14];

let segundos = 0;
let intervalo = null;
let pausado = false;
let numbers = [1,4,9,10];
let numberRandom = 0;
let questions = [];
let finished = 0;
let celdaActiva = null; // Variable global

// Cada vez que el usuario hace clic o escribe en un input, guardamos cuál es
document.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("input-celda")) {
        celdaActiva = parseInt(e.target.getAttribute("data-cell"));
        console.log("Editando celda:", celdaActiva);
    }
});

//Leemos los datos que están contenidos en data.json
fetch("images/data.json")
  .then(res => res.json())
  .then(data => {
    inicializarEstructuras(data);
  })
  .catch(err => console.error("Error leyendo JSON", err));


function inicializarEstructuras(jugadores) {
  for (const jugador of jugadores) {
    const { id, nombre, datos } = jugador;
    jugadoresMap.set(id, {
      id, nombre, datos
    });

    trie.insert(nombre.toLowerCase(), id);

    for (const token of nombre.toLowerCase().split(" ")) {
      trie.insert(token, id);
    }
  }
  window.trie=trie;
  window.jugadoresMap = jugadoresMap;
}

function debounce(fn, delay = 300) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const buscarDebounced = debounce(buscarEnTrie, 300);

// Escuchamos cualquier input que ocurra en la página
document.addEventListener("input", (e) => {
  // Solo actuamos si lo que disparó el evento es uno de nuestros inputs de celda
  if (e.target.classList.contains("input-celda")) {
    buscarDebounced(e.target.value);
  }
});

function buscarEnTrie(texto) {
  if (!window.trie || !window.jugadoresMap) return;

  const contenedor = document.getElementById("players");
  if (!contenedor) return;
  
  contenedor.innerHTML = ""; 

  const query = texto.trim().toLowerCase();
  if (!query) return;

  const ids = window.trie.autocomplete(query, 5);

ids.forEach(id => {
    const jugador = window.jugadoresMap.get(id);
    if (jugador) {
        const btn = document.createElement("button");
        btn.textContent = jugador.nombre;
        btn.classList.add("btn-player");

        btn.addEventListener("click", () => {
            if (!celdaActiva) return alert("Selecciona una celda primero");

          if (verify(celdaActiva, jugador)) {
         const inputDestino = document.querySelector(
              `input[data-cell="${celdaActiva}"]`
         );

            const celdaPadre = inputDestino.parentElement;

            // Volver la celda verde
            celdaPadre.classList.add("celda-correcta");

            // Cambiar contenido por el nombre
            celdaPadre.innerHTML = `<span class="nombre-acertado">${jugador.nombre}</span>`;

            finished += 1;
            checkWin();

            // Limpiar buscador
            contenedor.innerHTML = "";
            celdaActiva = null;
            } else {
         alert("Este jugador no cumple los requisitos de esta celda.");
            }
        });

        contenedor.appendChild(btn);
    }
});
}

function checkWin() {

    if (finished===9) {
        clearInterval(intervalo);
        
        setTimeout(() => {
            alert(`¡Felicidades! Completaste el tablero en ${tiempo.textContent}`);
        }, 200);
    }
}

function verify(placeofcell, jugador) {
    let question1, question2;

    // Columna
    switch (placeofcell) {
        case 1: case 4: case 7:
            question1 = questions[0]; break;    
        case 2: case 5: case 8:
            question1 = questions[1]; break;
        case 3: case 6: case 9:
            question1 = questions[2]; break;
    }

    // Fila
    switch (placeofcell) {
        case 1: case 2: case 3:
            question2 = questions[3]; break;    
        case 4: case 5: case 6:
            question2 = questions[4]; break;
        case 7: case 8: case 9:
            question2 = questions[5]; break;
    }

    // Lógica de validación
    const cat1 = question1.charAt(0);
    const cat2 = question2.charAt(0);

    const condition1 = jugador.datos[cat1].includes(parseInt(question1));
    const condition2 = jugador.datos[cat2].includes(parseInt(question2));

    return condition1 && condition2;
}

pausebtn.addEventListener("click", pausarTiempo)
reloadbtn.addEventListener("click", reiniciarJuego)

function setContent(place, key, questionplace) {
    switch (key) {
        case 0:
        const span = document.createElement("span");
        numberRandom = Math.floor(Math.random()*4);
        span.textContent = numbers[numberRandom];
        span.classList.add("texto-celda");
        celdas[place].appendChild(span);
        questions[questionplace]= "0" + numbers[numberRandom];
            break;

    case 1:
        agregarImg("images/101leon.png", "101", place, questionplace);
        break;

    case 2:
        agregarImg("images/102monterrey.png", "102", place, questionplace);
        break;

    case 3:
        agregarImg("images/103tigres.png", "103", place, questionplace);
        break;

    case 4:
        agregarImg("images/104america.png", "104", place, questionplace);
        break;

    case 5:
        agregarImg("images/108chivas.png", "108", place, questionplace);

        break;

    case 6:
        agregarImg("images/106pachuca.jpg", "106", place, questionplace);
        break;

    case 7:
        agregarImg("images/107tijuana.jpg", "107", place, questionplace);
        break;

    case 8:
        agregarImg("images/105cruzazul.png", "105", place, questionplace);
        break;

    case 9:
        agregarImg("images/109toluca.png", "109", place, questionplace);
        break;

    case 10:
        agregarImg("images/110atlas.png", "110", place, questionplace);
        break;

    case 11:
        agregarImg("images/111pumas.jpg", "111", place, questionplace);
        break;

    case 12:
        agregarImg("images/201brazil.png", "201", place, questionplace);
        break;

    case 13:
        agregarImg("images/202uruguay.png", "202", place, questionplace);
        break;

    case 14:
        agregarImg("images/203argentina.png", "203", place, questionplace);
        break;

    case 15:
        agregarImg("images/301liga-mx.png", "301", place, questionplace);
        break;

    case 16:
        agregarImg("images/302concacaf.jpg", "302", place, questionplace);
        break;

    case 17:
        agregarImg("images/401turco.jpg", "401", place, questionplace);
        break;

    case 18:
        agregarImg("images/402piojo.jpg", "402", place, questionplace);
        break;

    case 19:
        agregarImg("images/403tuca.jpg", "403", place, questionplace);
        break;
}
}

function asignarValores(){
    let randomArray= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    let sortedArray= [];

do {
    sortedArray = barajar(randomArray);
} while (!esValido(sortedArray));

    setContent(0,sortedArray[0],0);
    setContent(1,sortedArray[1],1);
    setContent(2,sortedArray[2],2);
    setContent(3,sortedArray[3],3);
    setContent(7,sortedArray[4],4);
    setContent(11,sortedArray[5],5);


}

function hayConflicto(a, b) {
    return (
        (a === chivas && prohibidos.has(b)) ||
        (b === chivas && prohibidos.has(a)) ||
        (prohibidos.has(a) && prohibidos.has(b))
    );
}

function esValido(arr) {
    const izquierda = [0,1,2];
    const derecha = [3,4,5];

    for (let i of izquierda) {
        for (let j of derecha) {
            if (hayConflicto(arr[i], arr[j])) {
                return false;
            }
        }
    }
    return true;
}

function barajar(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function agregarImg(src, valor, place, questionplace) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("img-celda");
    celdas[place].appendChild(img);
    questions[questionplace] = valor;
}

function iniciarTiempo() {
    if (intervalo) return; // evita duplicados

    intervalo = setInterval(() => {
        segundos++;

        const min = String(Math.floor(segundos / 60)).padStart(2, "0");
        const seg = String(segundos % 60).padStart(2, "0");

        tiempo.textContent = `${min}:${seg}`;
    }, 1000);
}

function pausarTiempo() {
    if (pausado===false) {
        clearInterval(intervalo);
        intervalo = null;
        pausado=true;        
    } else {
        iniciarTiempo();
        pausado=false;
    }
}

function reiniciarJuego() {
    pausarTiempo();
    segundos = 0;
    tiempo.textContent = "00:00";
    
celdas.forEach((celda, i) => {
    // 1. Limpiar el contenido (esto ya lo hacías)
    celda.innerHTML = "";

    // 2. Limpiar TODAS las clases extra y dejar solo la base
    // Esto quita "celda-verde", "acierto", o cualquier otra cosa
    celda.className = "celda"; 

    // 3. Limpiar estilos en línea (por si usaste celda.style.background)
    celda.removeAttribute("style");

    // 4. Re-insertar los inputs donde corresponda
    if (indicesInput.includes(i)) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("input-celda");
        
        const cellId = indicesInput.indexOf(i) + 1; 
        input.setAttribute("data-cell", cellId); 
        
        celda.appendChild(input);
    }
});    
    asignarValores();
    iniciarTiempo(); // Opcional: si quieres que arranque solo al dar clic
}
reiniciarJuego();
iniciarTiempo();

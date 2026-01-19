const tablero = document.getElementById("tablero");
let numeros = [4, 7, 12, 20, 25, 28, 43, 55, 66, 67, 72, 76, 88, 90, 94, 102, 112, 119, 120, 128, 138, 139]
let segundos = 0;
let intervalo = null;
let pausado = false;
const tiempo = document.getElementById("tiempo");
const celdas = document.querySelectorAll(".celda");

pausebtn.addEventListener("click", pausarTiempo)
reloadbtn.addEventListener("click", reiniciarJuego)


for (let i = 0; i < 289; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("input-celda");
    input.dataset.pos = i;
    input.maxLength = 1;

    celda.appendChild(input);
    tablero.appendChild(celda);
}

function colorNegro(numeros) {
    const celdas = document.querySelectorAll(".celda");

    numeros.forEach(pos => {
        if (celdas[pos]) {
            celdas[pos].classList.replace("celda", "celdauno");
            celdas[288-pos].classList.replace("celda", "celdauno");
        }
    });
}

function asignarNumero(numerodecelda, numero){
const celdas = document.querySelectorAll(".celda");
const fondo = document.createElement("span");
fondo.classList.add("indicedepalabras");
fondo.textContent = numero;
celdas[numerodecelda].appendChild(fondo);
}

function iniciarTiempo() {
    if (intervalo) return;

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
}


colorNegro(numeros);
asignarNumero(0,1);

reiniciarJuego();
iniciarTiempo();


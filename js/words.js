const modal = document.getElementById('contrasenia');
const modal1 = document.getElementById('setter');
const modal2 = document.getElementById('set-words');
const modal3 = document.getElementById('select-letters');

const createbtn = document.getElementById('createbtn');
const botoncontrasenia = document.getElementById('botoncontrasenia');
const botonpoema = document.getElementById('botonpoema');
const botonpalabras = document.getElementById('botonpalabras');
const botonfinal = document.getElementById('botonfinal');

class Quiz {
    constructor(poem= "", words=[], order=""){
        this.poem=poem;
        this.words=words;
        this.order=order;
    }
}
const myQuiz = new Quiz();

function abrirModal(element) {
    element.showModal(); 
}

createbtn.addEventListener("click", () => abrirModal(modal));


function cerrarYGuardar() {
    const contrasenia = document.getElementById('textoModal').value;
    if (contrasenia==="141106"){
        modal.close();
        abrirModal(modal1);
    }else{
        alert("Contraseña incorrecta");
    }
}

botoncontrasenia.addEventListener("click", cerrarYGuardar);

function savePoem() {
    myQuiz.poem = document.getElementById('writePoem').value;
    modal1.close();
    abrirModal(modal2);
}

botonpoema.addEventListener("click", savePoem);

function saveWords(){
    const wordsInput = document.getElementById('words-saved').value;
    let words_saved = wordsInput.trim().split(/\s+/);
    myQuiz.words = words_saved;
    modal2.close();
    generarBotonesLetras(words_saved)
    abrirModal(modal3);
}

botonpalabras.addEventListener("click", saveWords);

async function sendGame(){
    const response = await fetch('http://127.0.0.1:8000/send-initial-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myQuiz)
    });

    console.log(myQuiz);

    const result = await response.json();
    console.log("Python says:", result.message);
    alert(result.message);
}

botonfinal.addEventListener("click", sendGame);

function generarBotonesLetras(words) {

    let contenedor = document.getElementById('contenedor-letras');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'contenedor-letras';
        modal3.appendChild(contenedor);
    }

    contenedor.innerHTML = "";

    let selecciones = [];

words.forEach((palabra, index) => {
  palabra.split('').forEach(letra => {

    const btn = document.createElement('button');
    const posicion = index + 1;
    const identificador = `${posicion}${letra.toUpperCase()}`;

    btn.textContent = letra.toUpperCase();
    btn.className = 'btn-letra';

    btn.onclick = () => {
      btn.classList.toggle('seleccionada');

      if (btn.classList.contains('seleccionada')) {
        selecciones.push(identificador);
      } else {
        selecciones = selecciones.filter(item => item !== identificador);
      }
      myQuiz.order = selecciones.sort().join('');
    };

    contenedor.appendChild(btn);
  });
});
}




const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const start = document.querySelector('#start-pause');
const fin = new Audio('./sonidos/beep.mp3');
const inicio = new Audio('./sonidos/play.wav');
const pause = new Audio('./sonidos/pause.mp3');
const comenzarPausar = document.querySelector('#start-pause span');
const icono = document.querySelector('#start-pause img');
const temporizador = document.querySelector('#timer');
let segundosTrascurridos = 1500;
let intervalo = null;




musica.loop = true;

inputMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})


botonCorto.addEventListener('click', () => {
    segundosTrascurridos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    segundosTrascurridos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    segundosTrascurridos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});


function cambiarContexto(contexto) {
    mostrarTiempo();
    botones.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto) {

        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa</strong>`

            break;

        case 'descanso-corto':
            titulo.innerHTML = `¿Qué tal un respiro?<br>
                <strong class="app__title-strong">Haz una pausa corta!</strong>`
            break;

        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie<br>
                <strong class="app__title-strong">Haz una pausa larga!</strong>`
            break;

        default:
            break;
    }

}

let cuentaRegresiva = () => {
    
        if(segundosTrascurridos <= 0){
          
          fin.play();
          alert('fin');
          reiniciar();
                    
         return;
        }

        icono.setAttribute('src', './imagenes/pause.png');   
        comenzarPausar.textContent = "Pausar";      
        segundosTrascurridos -= 1;
        mostrarTiempo();
        return;
}



function iniciarPausar() {
   
    if (intervalo) {
         reiniciar();
         pause.play();
         
        return;
    }
   
    intervalo = setInterval(cuentaRegresiva, 1000);
    
    inicio.play();

     return;
}

start.addEventListener('click', iniciarPausar);


function reiniciar() {
    clearInterval(intervalo);
    intervalo = null;
    icono.setAttribute('src', './imagenes/play_arrow.png');   
    comenzarPausar.textContent = "Comenzar";      
}

function mostrarTiempo() {
    const tiempo = new Date(segundosTrascurridos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-Mx', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tiempoFormateado}`;
}
mostrarTiempo();

/*botonCorto.addEventListener('click', () => {
    html.setAttribute('data-contexto','descanso-corto');
    banner.setAttribute('src','./imagenes/descanso-corto.png');
}) ejemplo simple */
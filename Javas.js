let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador= false;
let timer = 30;
let timerInicial= 30;
let tiempoRegresivoId= null;

// Saludo
function mostrarNombre(){
    let nombreInput = document.getElementById('nombreInput').value;
    let mensaje = "¡Hola, " + nombreInput + "! Bienvenido.";
    let nombreMostrado = document.getElementById('nombreMostrado');
    nombreMostrado.textContent = mensaje;
    nombreMostrado.style.color = "white";
}

// Señalando los elementos de html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Realizador de números aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled=true
    }
}
// destapar tarjetas
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas ==2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        tarjeta2.disabled = true;

    //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
    //Pulir contador tarjetas destapadas
            tarjetasDestapadas = 0;
    //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML=`Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML=`Fantástico 🎉🎉🎉 Solo te demoraste ${timerInicial - timer}segundos`;  
                mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`
            }
        } else {
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },200);
        }
    }
}

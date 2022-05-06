/*
Reset se crea aquí por se una función específica, pues hará que los valores de los relojes vuelvan a por defecto
*/
function reset() {
    var fecha = new Date();
    document.getElementById("text_reloj").innerHTML = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    document.getElementById("text_cronometro").innerHTML = "00:00:00";
    document.getElementById("text_temporizador").innerHTML = "00:00:00";
}

/*
Permite crear el evento que muestre el primer argumento y oculte los otros dos
*/
function evento_activar(show, hide1, hide2) {
    var div_show, div_hide1, div_hide2;

    div_show = document.getElementById(show.id.split("_")[1]);
    div_hide1 = document.getElementById(hide1.id.split("_")[1]);
    div_hide2 = document.getElementById(hide2.id.split("_")[1]);
    //Al diseñar los divs de tal manera que su nombre sea la extensión del resto de elmentos podemos
    //Referenciarlos simplemente dividiendo la cadena del ID del resto y recogiendo el primer elemento.
    show.addEventListener("click", () => {
        reset();
        div_show.hidden = false;
        div_hide1.hidden = true;
        div_hide2.hidden = true;
    });

}

/* 
Función para establecer la funcionalidad de los botones
*/
function botones() {
    var activar_reloj, activar_cronometro, activar_temporizador;
    activar_reloj = document.getElementById("activar_reloj");
    activar_cronometro = document.getElementById("activar_cronometro");
    activar_temporizador = document.getElementById("activar_temporizador");
    evento_activar(activar_reloj, activar_cronometro, activar_temporizador);
    evento_activar(activar_cronometro, activar_reloj, activar_temporizador);
    evento_activar(activar_temporizador, activar_cronometro, activar_reloj);
}

function activarReloj() {
    var text_reloj = document.getElementById("text_reloj");
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    text_reloj.innerHTML = hora + ":" + minutos + ":" + segundos;

}

function crearIntervaloReloj() {
    intervalo_reloj = setInterval(activarReloj, 1000);
}

function stopIntervaloReloj() {
    clearInterval(intervalo_reloj);
}





function botonCronometro() {
    hCron = 0;
    mCron = 0;
    sCron = 0;
    boton = document.getElementById("start_cronometro")
    flagCronometro = document.getElementById("flag_cronometro");

    if (boton.innerHTML == "Start") {
        console.log("inicio")
        tiempo();
        intervaloCrono = setInterval(tiempo, 1000);
        //boton.removeEventListener("click", botonCronometro);
        boton.innerHTML = "Stop"
        flagCronometro.disabled = false;


        //for(i = 0;i<ul.lastChild.node; i)

    } else if (boton.innerHTML == "Stop") {
        clearInterval(intervaloCrono);
        hCron = 0;
        mCron = 0;
        sCron = 0;
        document.getElementById("text_cronometro").innerHTML = "00:00:00";
        boton.innerHTML = "Start"
        flagCronometro.disabled = true;
        ul = document.getElementById("tiempos_parciales");
        vueltasGuardadas = ul.getElementsByTagName("li");
        for (i = vueltasGuardadas.length - 1; i >= 0; i--) {
            vueltasGuardadas[i].remove();
        }
    }
}

function botonFlag() {
    var boton = document.getElementById("flag_cronometro");

    var tiempoFlag = document.getElementById("text_cronometro").innerHTML

    li = document.createElement("li");
    li.innerHTML = tiempoFlag;
    document.getElementById("tiempos_parciales").appendChild(li);
}

function tiempo() {
    sCron++
    if (sCron > 59) {
        mCron++;
        sCron = 0;
    }
    if (mCron > 60) {
        hCron++;
        mCron = 0;
    }

    if (sCron < 10) {
        sAuxCron = "0" + sCron;
    } else {
        sAuxCron = sCron;
    }

    if (mCron < 10) {
        mAuxCron = "0" + mCron
    } else {
        mAuxCron = mCron;
    }

    if (hCron < 10) {
        hAuxCron = "0" + hCron
    } else {
        hAuxCron = hCron;
    }
    document.getElementById("text_cronometro").innerHTML = hAuxCron + ":" + mAuxCron + ":" + sAuxCron;
}

function cronometro() {
    document.getElementById("start_cronometro").addEventListener("click", botonCronometro)
    document.getElementById("flag_cronometro").addEventListener("click", botonFlag)



    document.getElementById("text_cronometro").innerHTML = "00:00:00";
}

function tiempoTemporizador() {
    s--
    if (s < 0) { m--; s = 59; }
    if (m < 0) { h--; m = 59; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m } else { mAux = m; }
    if (h < 10) { hAux = "0" + h } else { hAux = h; }



    document.getElementById("text_temporizador").innerHTML = hAux + ":" + mAux + ":" + sAux;
}

function startTemporizador() {
    h = document.getElementById("horas_temporizador").value
    m = document.getElementById("minutos_temporizador").value
    s = document.getElementById("segundos_temporizador").value
    if (h == 0 && m == 0 && s == 0) {
        alert("Introduce los parámetros del temporizador");
    } else {

        //estado botones
        startTemp = document.getElementById("start_temporizador");
        stopTemp = document.getElementById("stop_temporizador");
        restartTemp = document.getElementById("restart_temporizador");
        if (startTemp.disabled == false) {
            stopTemp.disabled = false;
            restartTemp.disabled = false;
            startTemp.disabled = true;
        }

        textoTemporizador = document.getElementById("text_temporizador")
        h = document.getElementById("horas_temporizador").value
        m = document.getElementById("minutos_temporizador").value
        s = document.getElementById("segundos_temporizador").value

        if (h < 10) { hAux = "0" + h } else { hAux = h }
        if (m < 10) { mAux = "0" + m } else { mAux = m }
        if (s < 10) { sAux = "0" + s } else { sAux = s }
        textoTemporizador.innerHTML = hAux + ":" + mAux + ":" + sAux


        ms = (h * 3600000) + (m * 60000) + (s * 1000)
        function alerta() {
            alert("¡Temporizador!")
            clearInterval(id)
            clearTimeout(timeout);
            startTemp.disabled = false;
            stopTemp.disabled = true;
            restartTemp.disabled = true;
        }

        timeout = setTimeout(alerta, ms)
        tiempoTemporizador()
        id = setInterval(tiempoTemporizador, 1000)
    }
}

function stopTemporizador() {

    if (stopTemp.disabled == false) {
        stopTemp.disabled = true;
        restartTemp.disabled = true;
        startTemp.disabled = false;
    }
    clearInterval(id)
    clearTimeout(timeout);
}

function restartTemporizador() {
    clearInterval(id);
    clearTimeout(timeout);

    startTemporizador();
}

function temporizador() {


    document.getElementById("start_temporizador").addEventListener("click", startTemporizador)
    document.getElementById("stop_temporizador").addEventListener("click", stopTemporizador)
    document.getElementById("restart_temporizador").addEventListener("click", restartTemporizador)
}

function __main__() {

    preload(); //preload debe ser una función puramente gráfica, no funcional generalmente
    reset();
    botones();

    //Vamos a utilizar el objeto "window" para establecer las variables de los intervalos y temporizadores de forma global
    //Y no tener que utilizar parámetros para enviar o recibirlas, pues puede acabar liándonos en estos ejercicos.

    window.intervalo_reloj = null;
    window.intervalo_cronometro = null;
    window.temporizador_temporizador = null;

    //AQUI LAS LLAMADAS A CREACIÓN DE INTERVALOS

    crearIntervaloReloj(); //Como es un reloj, no haría falta detener el intervalo, pero se crea el método stopIntervaloReloj, por se acaso

    //CRONOMETRO
    cronometro();

    //TEMPORIZADOR
    temporizador();

}




__main__()
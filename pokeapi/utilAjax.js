/*
    Funcion solicitarPeticionAJAX()
        Esta función realizará una petición a una base de datos a través
        de AJAX

*/

const solicitarPeticionAJAX = (metodo, url, fRespuesta) => {
    const peticion = new XMLHttpRequest();
    
    peticion.onreadystatechange = () => {
        if ((peticion.readyState == 4) && (peticion.status == 200)) {
            fRespuesta(JSON.parse(peticion.responseText));
        }
    }
    peticion.open(metodo, url);
    peticion.send();
}

/*      Función genTabla
    Esta función genera una tabla (con thead y tbody) a partir de un array.
    Tendrá tantas filas y columnas como el array tenga. Además, los valores de
    dicho array será introducido en cada una de las celdas de dicha tabla.
    (Ejercicio 10)
*/

function genTablaPersonajes(aTabla){

    var tabla = document.createElement("table");
    var cabecera = document.createElement("thead");
    var cuerpo = document.createElement("tbody");
    var texto = document.createTextNode("");
    var enlace, fila, columna;

    tabla.border = 1;
    tabla.appendChild(cabecera);
    tabla.appendChild(cuerpo);

    for (i = 0; i < aTabla.length ; i++){
        if (i != 0) fila = document.createElement("tr");
        for (j = 0; j < aTabla[i].length ; j++){
            columna = document.createElement("td");
            if (j != aTabla[i].length-1 || i ==0){ // Añadimos el texto a todas las celdas que no tienen enlace
                texto.value = aTabla[i][j];
                columna.innerHTML = texto.value;
            }
            else { // Si tiene enlace, se lo añadimos
                enlace = document.createElement("a");
                enlace.href = aTabla[i][j];
                enlace.innerHTML = aTabla[i][j];
                enlace.onclick = clickPlaneta;
                columna.appendChild(enlace);
            }
            if (i != 0) fila.appendChild(columna);
            else cabecera.appendChild(columna);
        }
        if (i != 0) cuerpo.appendChild(fila);
    }
    return tabla;
}

function clickPlaneta(e){
    e.preventDefault();
    enlace = e.explicitOriginalTarget.href;
    solicitarPeticionAJAX("GET",enlace+"?format=json",(datos) => {
        var parrafo = document.getElementById("planeta");
        parrafo.innerHTML = "";
        var arrayPlaneta = [{key:"Nombre",value:datos.name},
            {key:"Periodo Rotación",value:datos.rotation_period},
            {key:"Periodo orbital",value:datos.orbital_period}, 
            {key:"Diametro",value:datos.diameter},
            {key:"Clima" ,value:datos.climate},
        ];
        for(i in arrayPlaneta){
            parrafo.innerHTML += "<br>"+arrayPlaneta[i].key+": "+arrayPlaneta[i].value;
        }
    });
}
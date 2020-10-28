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

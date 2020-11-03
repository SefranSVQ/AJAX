base = 0;
window.onload = () =>{
    cargaInicial();
}

function cargaInicial(){
    
    var tabla = generarTablaPokemons();

    // Rellenamos la tabla con los datos
    for (var cont = 1+base; cont <= 20 ; cont++){
        solicitarPeticionAJAX("GET","https://pokeapi.co/api/v2/pokemon/"+cont,(datos) => {
            // datos.id,datos.name,datos.sprites.front_default,datos.species.url
            for (var i = 0; i < 4 ; i++){
                for (var j = 0; j < 5 ; j++){
                    if (datos.id == i*5+j+1){
                        tabla.children[i].children[j].children[0].children[0].src = datos.sprites.front_default;
                        tabla.children[i].children[j].children[0].children[0].value = "https://pokeapi.co/api/v2/pokemon/"+datos.id;
                        tabla.children[i].children[j].children[0].children[0].onclick = clickPokemon;
                    }
                }
            }
        });
    }
}

function clickPokemon(e){ //caquita
    e.preventDefault(); 
    var enlace = e.originalTarget.value;
    solicitarPeticionAJAX("GET",enlace,(datos) => {
        //cogemos los datos que nos interesan del pokemon
        //console.log(datos);
        var datosPkmn = [datos.id,datos.name,datos.height,datos.weight, datos.sprites.front_default];
        var tipos = [];
        for (var i = 0; i<datos.types.length ;i++){
            tipos.push(datos.types[i].type.name);
        }
        var stats = []; 
        for (var i = 0; i<datos.stats.length ;i++){
            stats.push(datos.stats[i].base_stat);
        }

        //Damos formato al div descriptivo del pokemon
        var descripcion = document.getElementById("descripcion");
        descripcion.innerHTML = "";

        //imagen
        var img = document.createElement("img");
        img.src = datosPkmn[4];
        img.style.position = "relative";
        img.style.float = "left";
        img.style.width = "20%";
        img.style.marginLeft = "10%";

        //lista de datos
        var ulDatos = document.createElement("ul");
        var li;

        ulDatos.innerHTML = "Datos Básicos:";
        ulDatos.style.fontSize = "150%";
        ulDatos.style.marginLeft = "5%";
        ulDatos.style.marginTop = "6%";
        ulDatos.style.position = "relative";
        ulDatos.style.float = "left";
        ulDatos.style.width = "20%";

        li = document.createElement("li");
        li.innerHTML = "Nombre: "+datosPkmn[1];
        ulDatos.appendChild(li);

        li = document.createElement("li");
        li.innerHTML = "Número de la pokedex: "+datosPkmn[0];
        ulDatos.appendChild(li);

        for(i in tipos){
            li = document.createElement("li");
            li.innerHTML = "Tipo "+(1+parseInt(i))+": "+tipos[i];
            ulDatos.appendChild(li);
        }

        //lista de stats
        var ulStats = document.createElement("ul");

        ulStats.innerHTML = "Estadísticas Base:";
        ulStats.style.fontSize = "150%";
        ulStats.style.marginLeft = "5%";
        ulStats.style.marginTop = "4%";
        ulStats.style.position = "relative";
        ulStats.style.float = "left";
        ulStats.style.width = "20%";

        li = document.createElement("li");
        li.innerHTML = "Puntos de Salud: "+stats[0];
        ulStats.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Ataque: "+stats[1];
        ulStats.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Defensa: "+stats[2];
        ulStats.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Ataque Esp.: "+stats[3];
        ulStats.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Defensa Esp.: "+stats[4];
        ulStats.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Velocidad: "+stats[5];
        ulStats.appendChild(li);
        
        //añadimos todo al div de descripcion
        descripcion.appendChild(img);
        descripcion.appendChild(ulDatos);
        descripcion.appendChild(ulStats);
    });
}

function generarTablaPokemons(){

    var divTabla = document.getElementById("tabla");
    var tabla = document.createElement("table");
    var fila, columna, imagen, parrafo;

    //damos forma a la tabla
    for (var i = 0; i < 4 ; i++){
        fila = document.createElement("tr");

        for (var j = 0; j < 5 ; j++){
            columna = document.createElement("td");
            imagen = document.createElement("img");
            parrafo = document.createElement("p");

            imagen.style.width="auto";
            imagen.style.height="auto";
            imagen.style.border="1px solid #FCC";

            parrafo.appendChild(imagen);
            columna.appendChild(parrafo);
            fila.appendChild(columna);
        }

        tabla.appendChild(fila);
        divTabla.appendChild(tabla);
        divTabla.append(tabla); 
    }
    
    tabla.style.backgroundColor="#AAF";
    tabla.style.textAlign="center";
    tabla.style.marginLeft="auto";
    tabla.style.marginRight="auto";
    tabla.style.width="50%";

    return tabla;
}

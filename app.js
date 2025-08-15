let amigos=[];
let amigoSecreto='';

function asignarTextoElementoHTML(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function asignarTextoElementoPH(elemento, texto) {
    // Para el input, se usa .placeholder para el texto de sugerencia
    let elementoConPlaceholder = document.querySelector(elemento);
    elementoConPlaceholder.placeholder = texto;
}

function condicionesIniciales() {
    //Elementos HTML
    asignarTextoElementoHTML('h1','Juego del Amigo Secreto');
    asignarTextoElementoHTML('h2','Digite el nombre de sus amigos');
    asignarTextoElementoHTML('h3','')

    //Botones por ID
    asignarTextoElementoHTML('#agregar', '¡Añadir!');
    document.querySelector('#agregar').disabled = false; 

    asignarTextoElementoHTML('#textoBotonSortear', '¡Sortear Amigo!');
    document.querySelector('#sortear').setAttribute('disabled','true');

    //Eiquetas por ID
    asignarTextoElementoPH('#amigo','Escribe un nombre para empezar');
    //numeroSecreto = generarNumeroSecreto();
    //console.log(numeroSecreto);
    //intentos=1;
}

function limpiarInput() {
    //Limpia el input y actualiza texto de sugerencia
    document.querySelector('#amigo').value = '';
    // document.getElementById('amigo').value = '';
    asignarTextoElementoPH('#amigo', amigos.length === 1 
        ? 'Agrega un amigo más para poder sortear' 
        : 'Agrega a otro amigo o presiona el botón ¡Sortear Amigo!');
}


// Función para agregar amigos a la lista
function agregarAmigo() {
    // Obtener el valor del campo de texto
    let amigoPorAgregar = document.getElementById('amigo').value;
    
    // Validación: no permitir nombres vacíos ni repetidos
    if (amigoPorAgregar === '') {
        alert(amigos.length === 0 
            ? 'Favor, digite el nombre de uno de sus amigos.' 
            : `Favor, digite el nombre de otro de sus amigos${amigos.length <= 1 ? '.' : ' o presione el botón ¡Sortear Amigo!'}`);
        return;
    }

    if (amigos.includes(amigoPorAgregar)) {
        alert('Ese nombre ya ha sido agregado.');
        return;
    }

    // Agregar el nombre al array global
    amigos.push(amigoPorAgregar);
    
        
    if (amigos.length>1) {
        document.querySelector('#sortear').disabled = false;        
    }
    // Actualizar el HTML para mostrar la lista
    mostrarAmigos();

    // Limpiar el campo de texto
    limpiarInput();
}

// Función para mostrar la lista en el HTML
function mostrarAmigos() {
    let lista = document.getElementById('listaAmigos'); //A lo que sea que tenga el ID 'listaAmigos' en el HTML le llamaremos Lista
    lista.innerHTML = ''; // Limpia la lista antes de volver a mostrarla

    if (amigos.length>0) {
        asignarTextoElementoHTML('h3','Lista de Amigos:')

        // Asegura que la lista se muestre siempre que la actualicemos
        document.getElementById('listaAmigos').style.display = 'block';
    } else {
        asignarTextoElementoHTML('h3','')

    }

    for (let i = 0; i < amigos.length; i++) {
        let amigo = amigos[i];  

        let elementoLista = document.createElement('li');
        elementoLista.textContent = amigo;
        lista.appendChild(elementoLista);
    }

}

function sortearAmigo() {

    if (document.querySelector('#textoBotonSortear').innerHTML=='¡Nuevo juego!') {
        reiniciarJuego();
        return;
    }

    let posiciónSorteada =  Math.floor(Math.random()*amigos.length);

    amigoSecreto=amigos[posiciónSorteada];

    // Ocultar la lista de amigos
    document.getElementById('listaAmigos').style.display = 'none';

    //Muestra amigo sorteado
    asignarTextoElementoHTML('h3',`Tu amigo secreto será ${amigoSecreto}`)
    
    //Deshabilita botón de agregar amigos porque el sorteo ya se acabó
    document.querySelector('#agregar').disabled = true; 
   //Oculta sugerencia de agregar más nombres
    asignarTextoElementoPH('#amigo','');


    //Habilita nuevo juego
    asignarTextoElementoHTML('#textoBotonSortear', '¡Nuevo juego!');
    

}

function reiniciarJuego() {
    amigos=[];
    amigoSecreto='';
    asignarTextoElementoHTML('h3','')

    //Botones por ID
    asignarTextoElementoHTML('#agregar', '¡Añadir!');
    document.querySelector('#agregar').disabled = false; 

    asignarTextoElementoHTML('#textoBotonSortear', '¡Sortear Amigo!');
    document.querySelector('#sortear').setAttribute('disabled','true');

    //Eiquetas por ID
    asignarTextoElementoPH('#amigo','Escribe un nombre para empezar');
    
}

condicionesIniciales();










/* 

if (numeroSecreto === numeroDeUsuario) {
        asignarTextoElemento('p',`Acertaste al número en ${intentos} ${intentos == 1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    
    } else {
        //El usuario no acertó
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor')
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor')
        }
        intentos++;
        limpiarCaja();
    }







function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(intentos);
    if (numeroSecreto === numeroDeUsuario) {
        asignarTextoElemento('p',`Acertaste al número en ${intentos} ${intentos == 1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    
    } else {
        //El usuario no acertó
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor')
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor')
        }
        intentos++;
        limpiarCaja();
    }

    return;
}




function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p',`Ya se sortearon todos los números posibles`);
    } 
    else
    {
          //si el numero generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } 
        else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }


  
    
}


function reiniciarJuego() {
    //limpiar la caja
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Deshabilitar el botón de nuevo juego
    //Inicializar el número de intentos

    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

 */

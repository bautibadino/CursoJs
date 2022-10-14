// VAMOS A ITERAR CON UN FOR SOBRE 20 AÑOS, SIENDO QUE EL MAXIMO ES LA FECHA ACTUAL Y EL MINIMO ES 20 PARA ATRAS.
//LUEGO LO PLASME EN EL DOM, NO LO SABIA HACER PERO INVESTIGANDO UN POCO LO LOGRE.
const selectYear = document.querySelector('#year');
const submitButton = document.querySelector('#submit');
const selectModel = document.querySelector('#marca');
const titulo = document.querySelector

function llenarOpciones() {
    const max = new Date().getFullYear(),
        min = max - 20;


    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
    }
}

document.addEventListener('DOMContentLoaded', llenarOpciones())


// VAMOS A USAR UN IF PARA VERIFICAR QUE TODOS LOS CAMPOS SEAN LLENOS Y QUE NO HAYA UN STRING VACIO.

//EL USUARIO SE VA A VERIFICAR UNA VEZ QUE ESTE DE CLICK EN EL SUBMIT,
eventListeners()
function eventListeners() {
    const formulario = document.querySelector('#cotizador')
    formulario.addEventListener('submit', autenticarOpciones)
}

function autenticarOpciones(e) {
    e.preventDefault();
    if (selectModel.value === '' || selectYear.value === '') {
        console.log('no pasaste la verificacion')
    } else {
        console.log('usuario verificado')
    }
}

//NOMBRE EN DOM//
// let ingresoNombre = prompt('Ingrese su nombre');

function nombreEnDom(e) {
    const contenedor = document.querySelector('.contenedor-cotizador') // nodo padre
    const titulo = document.querySelector('.contenedor-cotizador h2'); //nodo sobre el que voy a insertar
    const parrafo = document.createElement('p');    //nuevo nodo
    parrafo.textContent = 'Hola' + ' ' + ingresoNombre;

    contenedor.insertBefore(parrafo, titulo)

    
    }
nombreEnDom(ingresoNombre)

if( ingresoNombre === null || ingresoNombre === '') {
    alert('INGRESE UN NOMBRE VALIDO, POR FAVOR')
}
// LETS AND CONST 
const selectYear = document.querySelector('#year');
const submitButton = document.querySelector('#submit');
const selectModel = document.querySelector('#marca');
const tipoSeguro = document.querySelector('#tipo-seguro');
const nombreSeguro = document.querySelector('#name')
const contenedorForm = document.querySelector('#cotizador');
const boton = document.querySelector('.textos a')


let precio;
const base = 5000;
let marca;
let tipoPoliza;
let presupuestos = [];
const nuevoArray = []
let presupuestoObj = {}


//EVENTLISTENERS
eventListeners()
function eventListeners() {

    contenedorForm.addEventListener('submit', verificar)
    contenedorForm.addEventListener('submit', cotizacionSeguro)
    
    document.addEventListener('DOMContentLoaded', () => {
        cotizacionesAnteriores()
        ui.llenarOpciones();
    })
    boton.addEventListener('click', trasladarSeccion);
}

// constructores de seguro
function UI() {
}

// VAMOS A ITERAR CON UN FOR SOBRE 20 AÑOS, SIENDO QUE EL MAXIMO ES LA FECHA ACTUAL Y EL MINIMO ES 20 PARA ATRAS.

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;


    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
    }
}

const ui = new UI();

//EL USUARIO SE VA A VERIFICAR UNA VEZ QUE ESTE DE CLICK EN EL SUBMIT,
// VAMOS A USAR UN IF PARA VERIFICAR QUE TODOS LOS CAMPOS SEAN LLENOS Y QUE NO HAYA UN STRING VACIO.
function verificar(e) {
    e.preventDefault();

    //VERIFICAMOS QUE NO HAYA UNA ALERTA ANTES, ASI NO TENEMOS REPETICION DE ESTA
    const alerta = document.querySelector('.divAlerta');

    if (!alerta) {
        if (selectModel.value === '' || selectYear.value === '' || tipoSeguro.value === '' || nombreSeguro.value === '') {
            crearAlerta('Debes completar todos los campos', 'error');
        } else {
            crearAlerta('Tu cotizacion esta siendo procesada...', 'correcto');
        }
    }
}

//TRAEMOS COTIZACIONES ANTERIORES DEL LOCALSTORAGE AL CARGAR EL DOM,
function cotizacionesAnteriores(e) {
    const listaPresupuestos = document.querySelector('.lista-cotizaciones-anteriores')
    presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];

    if (presupuestos.length > 0) {
        presupuestos.forEach(element => {
            const liPresupuesto = document.createElement('li')
            //le pasamos el id al html

            liPresupuesto.innerHTML = `
    <h3>TU PRESUPUESTO ANTERIOR</h3>
    <p><span>Nombre del cliente:</span> ${element.nombre}</p>
    <p><span>Marca:</span> ${element.marca}</p>
    <p><span>Modelo:</span> ${element.modelo}</p>
    <p><span>Tipo de seguro:</span> ${element.tipo}</p>
    <p><span>Total:</span> ${element.total}</p>
    `

    const cruz = document.createElement('button')
    cruz.innerText = 'X';
    cruz.classList.add('cruz')
    liPresupuesto.appendChild(cruz)
    const idNuevo = element.id;
    cruz.setAttribute('id', idNuevo )

    listaPresupuestos.appendChild(liPresupuesto);
    liPresupuesto.classList.add('presupuesto');

    //BORRAR COTIZACIONES ANTERIORES
    cruz.addEventListener('click', (e) =>{
        liPresupuesto.classList.add('traslado-presupuesto')
        setTimeout(() => {
            listaPresupuestos.removeChild(liPresupuesto)
            const presupuestoId = e.target.getAttribute('id');
            presupuestos = presupuestos.filter(presup => presup.id !== parseInt(presupuestoId))
            localStorage.setItem('presupuestos', JSON.stringify(presupuestos))    
        }, 500);

    })
        })


    }
}




function cotizacionSeguro(e) {
// USAREMOS UN SWITCH PARA ESTABLECER EL NOMBRE DE LA MARCA DE ACUERDO AL VALUE DEL HTML,
// ADEMAS USAREMOS UN PRECIO BASE QUE DE ACUERDO A LA MARCA SE MULTIPLICARÁ.

    switch (selectModel.value) {
        case '1':

            precio = base * 2.5;
            marca = 'Audi';
            break;
        case '2':

            precio = base * 2.8
            marca = 'BMW';
            break;
        case '3':

            precio = base * 1.9
            marca = 'Volkswagen';
            break;
        case '4':

            precio = base * 3
            marca = 'Mercedes Benz';
            break;
        case '5':

            precio = base * 1.7;
            marca = 'Chevrolet';
            break;
        case '6':

            precio = base * 1.7
            marca = 'Ford';
            break;
        case '7':

            precio = base * 1.2
            marca = 'Fiat'
            break;
        case '8':

            precio = base * 1.8
            marca = 'Alfa Romeo';
            break;
        case '9':

            precio = base
            marca = 'Chery';
            break;
        case '10':

            precio = base * 2
            marca = 'Nissan';

            break;
        case '11':

            precio = base * 2.7
            marca = 'Volvo';
            break;
        case '12':

            precio = base * 2
            marca = 'Toyota';
            break;
        case '13':

            precio = base * 1.3
            marca = 'Renault';
            break;
        case '14':

            precio = base * 2
            marca = 'Honda';
            break;
        case '15':

            precio = base * 1.9
            marca = 'Hyundai';

            break;

        default:
            break


    }

    //VAMOS A TOMAR EL VALOR QUE NOS ARROJA EL PRECIO DE LA MARCA Y LE VAMOS A RESTAR UN 2% POR YEAR QUE SEA MAS VIEJO EL AUTO

    const diferencia = new Date().getFullYear() - selectYear.value;

    precio -= ((diferencia * 2) * precio / 100);


    //POR ULTIMO, VAMOS A MULTIPLICAR EL PRECIO DEL SEGURO:
    //SI ES VALOR 1 (TERCEROS) = *1
    // SI ES VALOR 2(TERCEROS, ROBO E INC) = *1.35
    //SI ES VALOR 3 (TODO RIESGO) = *1.9

    switch (tipoSeguro.value) {
        case '1':
            precio = precio * 1;
            tipoPoliza = 'Seguro contra terceros'
            break

        case '2':
            precio = precio * 1.35;
            tipoPoliza = 'Seguro contra terceros, robo e incendio'
            break

        case '3':
            precio = precio * 1.9;
            tipoPoliza = 'Seguro contra todo riesgo'
            break;

        default:
            break;
    }

    //ESTABLECEMOS QUE SOLO CUANDO SE VERFIQUE TODO SE GUARDE EN STOREGE
    if(marca === undefined || tipoPoliza === undefined || precio === undefined || nombreSeguro.value === '' || nombreSeguro.value === Number ){
    }
    else{
        guardarStorage()
    }

}


function guardarStorage() {

    presupuestoObj = {
        nombre: `${nombreSeguro.value}`,
        marca: `${marca}`,
        modelo: `${selectYear.value}`,
        tipo: `${tipoPoliza}`,
        total: `${precio}`,
        id: Date.now()
    }


    presupuestos.push(presupuestoObj);
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

}


function crearAlerta(mensaje, tipo) {


    //ALERTA PASASTE DE VERIF O NO
    const divAlerta = document.createElement('div');
    const parrafoAlerta = document.createElement('p');

    divAlerta.appendChild(parrafoAlerta)
    divAlerta.classList.add('divAlerta')
    parrafoAlerta.textContent = mensaje;
    contenedorForm.appendChild(divAlerta)


    if (tipo === 'error') {
        divAlerta.classList.add('divAlerta-error')
        setTimeout(() => {
        divAlerta.classList.add('traslado-alerta')
        
            setTimeout(() => {
                divAlerta.remove()
            }, 1000);
        }, 4000);

    } else {
        divAlerta.classList.add('divAlerta-success')
        const spinner = document.querySelector('.lds-roller')
        spinner.style.visibility = 'visible';
        //UNA VEZ QUE SE PASA LA VERIFICACION PASAMOS A ARMAR EL PRESUPUESTO
        
        setTimeout(() => {
            divAlerta.classList.add('traslado-alerta')

                setTimeout(() => {
                    divAlerta.remove()
                    parrafoAlerta.remove()


                }, 1000);
                crearHTML()
                spinner.style.visibility = 'hidden';
            }, 4000);
    }



}

//CREAR HTML CON PRESUPUESTOS GENERADOS EN ESTA SESION (ACTUALES)
function crearHTML() {
    const presupuestoActual = document.querySelector('.cotizacion-actual')
    const liPresupuesto = document.createElement('li')

    liPresupuesto.innerHTML = `
    <h3>TU PRESUPUESTO </h3>
<p><span>Nombre del cliente:</span> ${presupuestoObj.nombre}</p>
    <p><span>Marca:</span> ${presupuestoObj.marca}</p>
    <p><span>Modelo:</span> ${presupuestoObj.modelo}</p>
    <p><span>Tipo de seguro:</span> ${presupuestoObj.tipo}</p>
    <p><span>Total:</span> ${presupuestoObj.total}</p>
        `

        const cruz = document.createElement('button')
        cruz.innerText = 'X';
        cruz.classList.add('cruz')
        liPresupuesto.append(cruz)
        
        const idHtml = presupuestoObj.id
        cruz.setAttribute('id', idHtml )

        presupuestoActual.appendChild(liPresupuesto);
        liPresupuesto.classList.add('presupuesto');

    contenedorForm.reset()

    cruz.addEventListener('click', (e) =>{

        liPresupuesto.classList.add('traslado-presupuesto')
        setTimeout(() => {
            presupuestoActual.removeChild(liPresupuesto)
            const presupuestoId = e.target.getAttribute('id');
            presupuestos = presupuestos.filter(presup => presup.id !== parseInt(presupuestoId))
            localStorage.setItem('presupuestos', JSON.stringify(presupuestos))    
        }, 500);

    })
}   

//EFECTO DE SMOOTH AL CLICKEAR Y QUE TRASLADE A OTRA SECC
function trasladarSeccion (e){
    e.preventDefault()

    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
        top: offsetTop,
        behavior: "smooth"
    })
}

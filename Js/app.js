


const selectYear = document.querySelector('#year');
const submitButton = document.querySelector('#submit');
const selectModel = document.querySelector('#marca');
const tipoSeguro = document.querySelector('#tipo-seguro');
const contenedorForm = document.querySelector('#cotizador');


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
    console.log(presupuesto)


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})



//EL USUARIO SE VA A VERIFICAR UNA VEZ QUE ESTE DE CLICK EN EL SUBMIT,
eventListeners()
function eventListeners() {
    const formulario = document.querySelector('#cotizador')
    formulario.addEventListener('submit', verificar)
    formulario.addEventListener('submit', cotizacionSeguro)
}

// VAMOS A USAR UN IF PARA VERIFICAR QUE TODOS LOS CAMPOS SEAN LLENOS Y QUE NO HAYA UN STRING VACIO.
function verificar(e) {

    e.preventDefault();

    if (selectModel.value === '' || selectYear.value === '' || tipoSeguro.value === '') {
        crearAlerta('Debes completar todos los campos', 'error');
    } else {
        crearAlerta('Tu cotizacion esta siendo procesada...', 'correcto');

        console.log(selectModel, selectYear.value, tipoSeguro.value)
    }



}


let precio;
const base = 5000;
let marca;
let tipoPoliza;

function cotizacionSeguro(e) {

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

    console.log(precio)

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

    // PARA FINALIZAR VAMOS A PLASMAR EL CONTENIDO EN EL HTML


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
    } else if (tipo === 'correcto') {
        divAlerta.classList.add('divAlerta-success')

        //UNA VEZ QUE SE PASA LA VERIFICACION PASAMOS A ARMAR EL PRESUPUESTO
        setTimeout(() => {
            const divPresupuesto = document.createElement('div')
            divPresupuesto.innerHTML = `
            <h3>TU PRESUPUESTO </h3>
            <p><span>Marca:</span> ${marca}</p>
            <p><span>Modelo:</span> ${selectYear.value}</p>
            <p><span>Tipo de seguro:</span> ${tipoPoliza}</p>
            <p><span>Total:</span> ${precio}</p>
            `
            contenedorForm.appendChild(divPresupuesto);
            divPresupuesto.classList.add('presupuesto')
        }, 4000);
    }


    setTimeout(() => {
        divAlerta.remove()
        parrafoAlerta.remove()
    }, 4000);



}

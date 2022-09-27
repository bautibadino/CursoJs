// VAMOS A ITERAR CON UN FOR SOBRE 20 AÑOS, SIENDO QUE EL MAXIMO ES LA FECHA ACTUAL Y EL MINIMO ES 20 PARA ATRAS.
//LUEGO LO PLASME EN EL DOM, NO LO SABIA HACER PERO INVESTIGANDO UN POCO LO LOGRE.
const selectYear = document.querySelector('#year');
const submitButton = document.querySelector('#submit');
const selectModel = document.querySelector ('#marca');


function llenarOpciones(){
    const max = new Date().getFullYear(),
        min = max - 20;
    

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
    }}

document.addEventListener('DOMContentLoaded', llenarOpciones())



// VAMOS A USAR UN IF PARA VERIFICAR QUE TODOS LOS CAMPOS SEAN LLENOS Y QUE NO HAYA UN STRING VACIO.

//EL USUARIO SE VA A VERIFICAR UNA VEZ QUE ESTE DE CLICK EN EL SUBMIT,
eventListeners()
function eventListeners (){
    const formulario = document.querySelector('#cotizador')
    formulario.addEventListener('submit', autenticarOpciones)
}

function autenticarOpciones(e){
    e.preventDefault();
    if(selectModel.value === '' || selectYear.value === ''){
        console.log('no pasaste la verificacion')
    }else{
        console.log('usuario verificado')
    }
}
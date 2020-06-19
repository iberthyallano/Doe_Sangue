document
    .querySelector('header button')
    .addEventListener("click", function(){
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })


function checkFields(event){
    const valuesToCheck = [
        "name",
        "email",
        "blood",

    ];

    const isEmpty = valuesToCheck.find(function(value){    
        const checkIfIsString = typeof event.target[value].value === "string";
        const checkIfIsEmpty = !event.target[value].value.trim();
        if(checkIfIsString && checkIfIsEmpty){
            return true;
        }
    })

    if(isEmpty){
        event.preventDefault();
        alert("Por favor, preencha todos os campos!  ");
    }
}
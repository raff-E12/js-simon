// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

//Selezione degli elementi del DOM
let index_contdown = document.getElementById('countdown');
let cont_numbers = document.getElementById('numbers-list');
let input_memory = document.getElementById('answers-form');

//Funzione di realizzazione del contdown e Implementazione dei relativi sequzioni di codice

const ContDownHandleInput = (counts, parentnode, inputnode)=>{
    let count = 10;
    let interval_increment = setInterval(()=>{
            count--;
            counts.textContent = count;
            if (count === 0) {
                clearInterval(interval_increment);
                parentnode.classList.add('d-none');
                inputnode.classList.remove('d-none');
            }
    }, 1200);
}

const NumberRandomGenHandle = (listparent)=>{
    for (let index = 0; index < 5; index++) {
        let Number_number = Math.ceil(Math.random() * 50);
        let list_number = document.createElement('li');
        list_number.setAttribute('data-number', Number_number);
        list_number.setAttribute('id', index);
        list_number.textContent = Number_number;
        listparent.append(list_number);
    }
}

NumberRandomGenHandle(cont_numbers);
ContDownHandleInput(index_contdown, cont_numbers, input_memory);

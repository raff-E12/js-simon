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
    }, 1100);
}

const NumberRandomGenHandle = (listparent)=>{
    let Number_random = [];
    for (let index = 0; index < 5; index++) {
        let Number_number = Math.ceil(Math.random() * 50);
        Number_random.push(Number_number);
        let list_number = document.createElement('li');
        list_number.setAttribute('data-number', Number_number);
        list_number.setAttribute('id', index);
        list_number.textContent = Number_number;
        listparent.append(list_number);
    }
    return Number_random
}

const HandleInputCheckEvent = (btn, numbersRandom, message)=>{

    btn.addEventListener('click', (e) => {
        let input_number_selection = document.querySelectorAll('.form-control');
        let correct_numbers = [];
        let incorrect_numbers = [];
        let index = 0;

        e.preventDefault();

        while (index < input_number_selection.length) {
            let data_number = Number(input_number_selection[index].value);
            if (numbersRandom.includes(data_number)) {
                correct_numbers.push(data_number);
            } else {
                incorrect_numbers.push(data_number);
            }
            index++;
        }

        if (correct_numbers.length === numbersRandom.length || numbersRandom.length === correct_numbers.length) {
            message.classList.add('text-success');
            message.classList.remove('text-danger');
            message.textContent = `Complimenti! Hai indovinato tutti i numeri: ${numbersRandom.join('-')}`;
        } else {
            message.classList.add('text-danger');
            message.classList.remove('text-success');
            message.textContent = `Riprova! Hai indovinato: (${correct_numbers.join('-')}), ma i numeri errati sono: (${incorrect_numbers.join('-')}).`;
        }
    })

}

const RandomNumber = NumberRandomGenHandle(cont_numbers);
ContDownHandleInput(index_contdown, cont_numbers, input_memory);

const btn_Gen = document.getElementById('btn-conf');
let text_message_sc = document.getElementById('message');
HandleInputCheckEvent(btn_Gen, RandomNumber, text_message_sc)

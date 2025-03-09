// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

//Selezione degli elementi del DOM
let index_contdown = document.getElementById('countdown');
let cont_numbers = document.getElementById('numbers-list');
let input_memory = document.getElementById('answers-form');

// Funzione per il countdown e la visualizzazione del modulo di input
const ContDownHandleInput = (counts, parentnode, inputnode) => {
    let count = 10;
    let interval_increment = setInterval(() => {
        count--;
        counts.textContent = count;
        if (count === 0) {
            clearInterval(interval_increment);
            parentnode.classList.add('d-none');
            inputnode.classList.remove('d-none');
        }
    }, 900);
}

// Funzione per generare numeri casuali e mostrarli nella lista
const NumberRandomGenHandle = (listparent) => {
    let randomNumbers = [];
    for (let index = 0; index < 5; index++) {
        let Number_number = Math.ceil(Math.random() * 50);
        randomNumbers.push(Number_number);
        let list_number = document.createElement('li');
        list_number.setAttribute('data-number', Number_number);
        list_number.setAttribute('id', index);
        list_number.textContent = Number_number;
        listparent.append(list_number);
    }
    return randomNumbers; // Restituisce i numeri generati per il controllo successivo
}

// Funzione per gestire il controllo degli input utente rispetto ai numeri generati
const InputNumberCheckHandle = (btn_conf_inp, randomNumbers) => {
    btn_conf_inp.addEventListener('click', (e) => {
        let input_number = document.querySelectorAll('.form-control');
        let text_message = document.getElementById('message');
        let correctGuesses = []; //Utilizzo degli array per il realtivo confronto in condizione tra input e numeri randomici
        let incorrectGuesses = [];
        let userNumbers = [];

        // Loop attraverso i campi di input e confronta con i numeri generati
        for (let i = 0; i < input_number.length; i++) {
            let data_number = Number(input_number[i].value);

            if (data_number <= 0 || isNaN(data_number)) { //Convalidazione e Controllo input
                text_message.classList.add('text-danger');
                text_message.classList.remove('text-success');
                text_message.textContent = "Input non valido";
                e.preventDefault();
                return;
            }
    
            if (userNumbers.includes(data_number)) { //Controllo Numeri Ripetizione
                text_message.classList.add('text-danger');
                text_message.textContent = `Numero duplicato: ${data_number}. Inserisci numeri diversi.`;
                e.preventDefault();
                return;
            } 

            userNumbers.push(data_number);

            if (randomNumbers.includes(data_number)) { //Aggiunta aggiunta dei valori input di confronto
                correctGuesses.push(data_number);
            } else {
                incorrectGuesses.push(data_number);
            }

        }

        // Mostra il risultato
        if (correctGuesses.length === randomNumbers.length) {
            text_message.classList.add('text-success');
            text_message.classList.remove('text-danger');
            text_message.textContent = `Complimenti! Hai indovinato tutti i numeri: (${correctGuesses.join(', ')})`;
        } else {
            text_message.classList.add('text-danger');
            text_message.classList.remove('text-success');
            text_message.textContent = `Riprova! Hai indovinato: ${correctGuesses.join(', ')}, ma i numeri errati sono: [${incorrectGuesses.join(', ')}].`;
        }

        e.preventDefault();
    });
}

// Inizializza il gioco
const randomNumbers = NumberRandomGenHandle(cont_numbers);
ContDownHandleInput(index_contdown, cont_numbers, input_memory);

// Aggiungi l'event listener dopo aver generato i numeri casuali
const btn_conf_inp = document.getElementById('btn-conf');
InputNumberCheckHandle(btn_conf_inp, randomNumbers);


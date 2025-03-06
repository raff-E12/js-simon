// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

//Selezione degli elementi del DOM
let index_contdown = document.getElementById('countdown');
let cont_numbers = document.getElementById('numbers-list');

//Funzione di realizzazione del contdown

const ContDownHandleInput = (index)=>{
    let count = 10;
    let interval_increment = setInterval(()=>{
            count--;
            index.textContent = count;
            if (count === 0) {
                clearInterval(interval_increment)
            }
        }, 1200);
}

ContDownHandleInput(index_contdown)
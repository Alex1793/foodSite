import tabs  from './modules/tabs';
import modal  from './modules/modal';
import calc  from './modules/calc';
import cards  from './modules/cards';
import forms  from './modules/forms';
import slider  from './modules/slider';
import timer  from './modules/timer';
import { showModal } from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const showModalbyTime = setTimeout(() => showModal('.modal', showModalbyTime), 30000);

    tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    modal('[data-modal]', '.modal', showModalbyTime);
    calc(); 
    cards(); 
    forms('form' ,showModalbyTime);
    slider();
    timer();    
});

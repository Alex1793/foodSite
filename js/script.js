window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabcContents = document.querySelectorAll('.tabcontent'),
          tabContainer = document.querySelector('.tabcontainer');
    

    function hideTabsContent () {
        tabcContents.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabsContent (i = 0) {
        tabcContents[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabsContent();
    showTabsContent();

    tabContainer.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target === item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });



    // Timer

    const deadline = '2023-11-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const btnModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          btnClose = document.querySelector('[data-close]');
    
    btnModal.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
        })
    })

    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

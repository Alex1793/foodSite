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
          modal = document.querySelector('.modal');

    function showModal () {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(showModalbyTime);
    }

    btnModal.forEach(item => {
        item.addEventListener('click', showModal);
    })

    function closeModal () {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();    
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape') {
            closeModal();
        }
    })

    const showModalbyTime = setTimeout(showModal, 3000000);


    function showModalbyScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalbyScroll);
        }
    }

    window.addEventListener('scroll', showModalbyScroll);


    // Cards

    const cardsContainer = document.querySelector('.menu__field .container');

    class Cards {
        constructor (img, alt, title, descr, price) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.alt = alt;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        createCard () {
            const div = document.createElement('div');
            div.classList.add('menu__item');
            
            div.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `

            cardsContainer.append(div);
        }
    }

    const getResours = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getResours('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Cards(img, altimg, title, descr, price).createCard();
            })
        })

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failed: 'Что-то пошло не так'
    }

    forms.forEach(item => {
        bindPostData(item)
    })

    const postData = async (url, data) => {
        const res = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const ststusMessage = document.createElement('img');
            ststusMessage.src = message.loading;
            ststusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                margin-top: 10px;
            `
            form.insertAdjacentElement('afterend', ststusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries())); 
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                ststusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failed);
            }).finally(() => {
                form.reset();
            })

        })
    }

    function showThanksModal (message) {

        const mDialog = document.querySelector('.modal__dialog');
        mDialog.style.display = 'none';
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            mDialog.style.display = 'block';
            closeModal();
        }, 3000);
    }


    // Slider

    const prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          sliders = document.querySelectorAll('.offer__slide'),
          current = document.querySelector('#current');
        
    let slideIndex = 0;
    
    function hideSlides () {
        sliders.forEach(item => {
            item.style.display = 'none';
        })
    }

    function showSlide (i) {
        sliders[i].style.display = 'block';
        current.innerHTML = `0${i + 1}`;
    }

    hideSlides();
    showSlide(slideIndex);

    next.addEventListener('click', () => {
        slideIndex++;

        if(slideIndex == sliders.length) {
            slideIndex = 0;
        }

        hideSlides();
        showSlide(slideIndex);
    })

    prev.addEventListener('click', () => {
        slideIndex--;

        if(slideIndex < 0) {
            slideIndex = sliders.length - 1;
        }

        hideSlides();
        showSlide(slideIndex);
    })
});

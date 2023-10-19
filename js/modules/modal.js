function showModal (modalSelector, showModalbyTime) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if(showModalbyTime) {
        clearInterval(showModalbyTime);
    }
}

function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal (triggerSelector, modalSelector, showModalbyTime) {
    const btnModal = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    btnModal.forEach(item => {
        item.addEventListener('click', () => showModal(modalSelector, showModalbyTime));
    })

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);    
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape') {
            closeModal(modalSelector);
        }
    })

    function showModalbyScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, showModalbyTime);
            window.removeEventListener('scroll', showModalbyScroll);
        }
    }

    window.addEventListener('scroll', showModalbyScroll);
}

export default modal;
export {showModal, closeModal};
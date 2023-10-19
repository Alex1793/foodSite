import { showModal, closeModal } from "./modal";
import {postData} from "../services/sevices";

function forms (formSelector ,showModalbyTime) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failed: 'Что-то пошло не так'
    }

    forms.forEach(item => {
        bindPostData(item)
    })



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
                console.log(data)
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
        showModal('.modal', showModalbyTime);

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
            closeModal('.modal');
        }, 3000);
    }
}

export default forms;
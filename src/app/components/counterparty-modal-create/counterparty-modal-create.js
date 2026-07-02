import {
    getCounterpartyFromForm,
    isCounterpartyValid,
} from "../counterparty-form/counterparty-form";

const createCounterpartyCreateModal = (rootElement = document, options = {}) => {
    const modalElement = rootElement.getElementById('crud-modal');
    const formElement = rootElement.getElementById('create-counterparty-form');
    const cancelButton = rootElement.getElementById('create-counterparty-cancel-button');
    const closeButton = rootElement.getElementById('create-modal-close-button');

    let onSave = typeof options.onSave === 'function' ? options.onSave : () => true;

    const openModal = () => {
        modalElement.classList.remove('hidden');
        modalElement.classList.add('flex');
        modalElement.setAttribute('aria-hidden', 'false');
    }

    const closeModal = () => {
        formElement.reset();
        modalElement.classList.add('hidden');
        modalElement.classList.remove('flex');
        modalElement.setAttribute('aria-hidden', 'true');
    }

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const counterparty = getCounterpartyFromForm(formElement);
        if (!isCounterpartyValid(counterparty)) {
            return;
        }

        const saveResult = onSave(counterparty);
        if (saveResult !== false) {
            closeModal();
        }
    });

    cancelButton.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);

    modalElement.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            closeModal();
        }
    });

    return {
        open: () => {
            formElement.reset();
            openModal();
        },
        close: closeModal,
        setOnSave: (handler) => {
            onSave = handler;
        },
    };
}

export { createCounterpartyCreateModal };

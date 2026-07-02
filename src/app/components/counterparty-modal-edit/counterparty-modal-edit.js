import {
    fillCounterpartyForm,
    getCounterpartyFromForm,
    isCounterpartyValid,
} from "../counterparty-form/counterparty-form";

const createCounterpartyEditModal = (rootElement = document, options = {}) => {
    const modalElement = rootElement.getElementById('edit-modal');
    const formElement = rootElement.getElementById('edit-counterparty-form');
    const cancelButton = rootElement.getElementById('edit-counterparty-cancel-button');
    const closeButton = rootElement.getElementById('edit-modal-close-button');

    let onSave = typeof options.onSave === 'function' ? options.onSave : () => true;
    let editedCounterpartyIndex = null;

    const openModal = () => {
        modalElement.classList.remove('hidden');
        modalElement.classList.add('flex');
        modalElement.setAttribute('aria-hidden', 'false');
    }

    const closeModal = () => {
        formElement.reset();
        editedCounterpartyIndex = null;
        modalElement.classList.add('hidden');
        modalElement.classList.remove('flex');
        modalElement.setAttribute('aria-hidden', 'true');
    }

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!Number.isInteger(editedCounterpartyIndex)) {
            closeModal();
            return;
        }

        const counterparty = getCounterpartyFromForm(formElement);
        if (!isCounterpartyValid(counterparty)) {
            return;
        }

        const saveResult = onSave({
            index: editedCounterpartyIndex,
            counterparty,
        });

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
        open: ({ index, counterparty }) => {
            if (!Number.isInteger(index)) {
                return;
            }

            editedCounterpartyIndex = index;
            fillCounterpartyForm(formElement, counterparty);
            openModal();
        },
        close: closeModal,
        getEditingIndex: () => editedCounterpartyIndex,
        shiftEditingIndexAfterRemoval: (removedIndex) => {
            if (!Number.isInteger(editedCounterpartyIndex)) {
                return;
            }

            if (removedIndex < editedCounterpartyIndex) {
                editedCounterpartyIndex -= 1;
            }
        },
        setOnSave: (handler) => {
            onSave = handler;
        },
    };
}

export { createCounterpartyEditModal };

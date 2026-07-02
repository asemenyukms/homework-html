const createCounterpartiesTable = (rootElement = document) => {
    const tableBodyElement = rootElement.getElementById('counterparties-table-body');
    const rowTemplateElement = rootElement.getElementById('counterparty-row-template');

    let onDelete = () => {};
    let onEdit = () => {};

    const parseIndex = (value) => {
        const index = Number(value);
        return Number.isInteger(index) ? index : null;
    }

    tableBodyElement.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.js-delete-counterparty-button');
        if (!deleteButton) {
            return;
        }

        const counterpartyIndex = parseIndex(deleteButton.dataset.index);
        if (counterpartyIndex === null) {
            return;
        }

        onDelete(counterpartyIndex);
    });

    tableBodyElement.addEventListener('dblclick', (event) => {
        if (event.target.closest('.js-delete-counterparty-button')) {
            return;
        }

        const rowElement = event.target.closest('.counterparty-row');
        if (!rowElement) {
            return;
        }

        const counterpartyIndex = parseIndex(rowElement.dataset.index);
        if (counterpartyIndex === null) {
            return;
        }

        onEdit(counterpartyIndex);
    });

    return {
        setOnDelete: (handler) => {
            onDelete = handler;
        },
        setOnEdit: (handler) => {
            onEdit = handler;
        },
        render: (counterparties) => {
            tableBodyElement.innerHTML = '';

            for (const [index, counterparty] of counterparties.entries()) {
                const rowElement = rowTemplateElement.content.firstElementChild.cloneNode(true);

                rowElement.dataset.index = String(index);
                rowElement.querySelector('.js-counterparty-name').textContent = counterparty.name;
                rowElement.querySelector('.js-counterparty-inn').textContent = counterparty.inn;
                rowElement.querySelector('.js-counterparty-address').textContent = counterparty.address;
                rowElement.querySelector('.js-counterparty-kpp').textContent = counterparty.kpp;
                rowElement.querySelector('.js-delete-counterparty-button').dataset.index = String(index);

                tableBodyElement.appendChild(rowElement);
            }
        },
    };
}

export { createCounterpartiesTable };

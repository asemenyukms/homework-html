import { createCounterpartiesTable } from "../../components/counterparties-table/counterparties-table";
import { createCounterpartyCreateModal } from "../../components/counterparty-modal-create/counterparty-modal-create";
import { createCounterpartyEditModal } from "../../components/counterparty-modal-edit/counterparty-modal-edit";
import { createCounterpartiesStore } from "./store";

const initialCounterparties = [
    {
        name: 'ООО Логистика',
        inn: '7705123456',
        address: 'г. Москва, ул. Лесная, д. 12',
        kpp: '770501001',
    },
    {
        name: 'ЗАО Альфа Трейд',
        inn: '7812345678',
        address: 'г. Санкт-Петербург, Невский проспект, д. 7',
        kpp: '781201001',
    },
    {
        name: 'ООО Технопром',
        inn: '6678123450',
        address: 'г. Екатеринбург, ул. Малышева, д. 25',
        kpp: '667801001',
    },
];

const initCounterpartiesPage = (rootElement = document) => {
    const addCounterpartyButton = rootElement.getElementById('add-counterparty-button');

    const counterpartiesStore = createCounterpartiesStore(initialCounterparties);
    const counterpartiesTable = createCounterpartiesTable(rootElement);

    const createModal = createCounterpartyCreateModal(rootElement, {
        onSave: (counterparty) => {
            counterpartiesStore.add(counterparty);
            counterpartiesTable.render(counterpartiesStore.getAll());
            return true;
        },
    });

    const editModal = createCounterpartyEditModal(rootElement, {
        onSave: ({ index, counterparty }) => {
            const isUpdated = counterpartiesStore.update(index, counterparty);
            if (!isUpdated) {
                return false;
            }

            counterpartiesTable.render(counterpartiesStore.getAll());
            return true;
        },
    });

    counterpartiesTable.setOnDelete((counterpartyIndex) => {
        const isRemoved = counterpartiesStore.remove(counterpartyIndex);
        if (!isRemoved) {
            return;
        }

        if (editModal.getEditingIndex() === counterpartyIndex) {
            editModal.close();
        } else {
            editModal.shiftEditingIndexAfterRemoval(counterpartyIndex);
        }

        counterpartiesTable.render(counterpartiesStore.getAll());
    });

    counterpartiesTable.setOnEdit((counterpartyIndex) => {
        const counterparty = counterpartiesStore.getByIndex(counterpartyIndex);
        if (!counterparty) {
            return;
        }

        editModal.open({
            index: counterpartyIndex,
            counterparty,
        });
    });

    addCounterpartyButton.addEventListener('click', () => {
        createModal.open();
    });

    counterpartiesTable.render(counterpartiesStore.getAll());
}

export { initCounterpartiesPage };

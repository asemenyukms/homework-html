const cloneCounterparty = (counterparty) => ({
    name: counterparty.name,
    inn: counterparty.inn,
    address: counterparty.address,
    kpp: counterparty.kpp,
});

const createCounterpartiesStore = (initialCounterparties = []) => {
    const counterparties = initialCounterparties.map(cloneCounterparty);

    const isValidIndex = (index) => Number.isInteger(index) && index >= 0 && index < counterparties.length;

    return {
        getAll: () => counterparties.map(cloneCounterparty),
        getByIndex: (index) => {
            if (!isValidIndex(index)) {
                return null;
            }

            return cloneCounterparty(counterparties[index]);
        },
        add: (counterparty) => {
            counterparties.push(cloneCounterparty(counterparty));
        },
        update: (index, counterparty) => {
            if (!isValidIndex(index)) {
                return false;
            }

            counterparties[index] = cloneCounterparty(counterparty);
            return true;
        },
        remove: (index) => {
            if (!isValidIndex(index)) {
                return false;
            }

            counterparties.splice(index, 1);
            return true;
        },
    };
}

export { createCounterpartiesStore };

const normalizeFormValue = (value) => String(value ?? '').trim();

const getCounterpartyFromForm = (formElement) => {
    const formData = new FormData(formElement);

    return {
        name: normalizeFormValue(formData.get('name')),
        inn: normalizeFormValue(formData.get('inn')),
        address: normalizeFormValue(formData.get('address')),
        kpp: normalizeFormValue(formData.get('kpp')),
    };
}

const isCounterpartyValid = (counterparty) => {
    return [
        counterparty.name,
        counterparty.inn,
        counterparty.address,
        counterparty.kpp,
    ].every((value) => value !== '');
}

const fillCounterpartyForm = (formElement, counterparty) => {
    formElement.elements.name.value = counterparty.name ?? '';
    formElement.elements.inn.value = counterparty.inn ?? '';
    formElement.elements.address.value = counterparty.address ?? '';
    formElement.elements.kpp.value = counterparty.kpp ?? '';
}

export {
    fillCounterpartyForm,
    getCounterpartyFromForm,
    isCounterpartyValid,
};

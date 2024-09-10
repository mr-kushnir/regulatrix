export const getErrorMessage = (e) => {
    return e?.response?.data?.detail || e.message || 'Неизвестная ошибка';
}

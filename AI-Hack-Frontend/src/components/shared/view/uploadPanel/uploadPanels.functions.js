export const formatFileSize = (sizeInBytes) => {
    const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];
    let size = sizeInBytes;
    let unitIndex = 0;

    // Преобразуем размер, пока не найдем подходящую единицу измерения
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    // Округляем результат до 2 знаков после запятой
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

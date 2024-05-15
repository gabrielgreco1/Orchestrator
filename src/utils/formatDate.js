
export default function formatDate(inputDate) {
    const date = new Date(inputDate);
    return date.toISOString(); // Retorna a data no formato ISO
};
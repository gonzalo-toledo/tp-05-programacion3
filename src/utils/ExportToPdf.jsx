import {jsPDF} from 'jspdf';
import {autoTable} from 'jspdf-autotable';

export const exportToPdf = (data, title, columns) => {
    const doc = new jsPDF();

    //titulo del pdf
    doc.text(title, 14, 10);

    // cuerpo del pdf
    const tableColumn = [columns];
    // Preparar las filas en orden de columnas
    const tableRows = data.map(item =>
    columns.map(col => item[col] ?? "")
    );

    autoTable( doc, {
        head: tableColumn,
        body: tableRows,
        styles: { fontSize: 10 },
        startY: 20,
        theme: 'grid',
    });
    doc.save(`${title}.pdf`); // se guarda el pdf con el nombre que se le pasa por parametro
};


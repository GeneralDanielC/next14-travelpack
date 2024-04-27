"use client";

import Excel from 'exceljs';

export const ExcelInput = () => {
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const buffer = event.target.result;
            const workbook = new Excel.Workbook();
            await workbook.xlsx.load(buffer);

            const worksheet = workbook.getWorksheet(1); // Assuming you want to read the first worksheet
            const rows = [];

            // Start reading from the second row to skip headers, or adjust according to your Excel structure
            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                if (rowNumber > 1) { // Assuming the first row contains headers
                    const rowObject = {};
                    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                        // Assuming the first row contains the headers and they are unique
                        const header = worksheet.getRow(1).getCell(colNumber).value;
                        if (header === "themeIds") {
                            if (cell.value.toUpperCase() === "ALL") {
                                rowObject[header] = "themes.map(theme => theme.id)";
                            } else {
                                const themes = cell.value.split(',').map(theme => 
                                    `themeIdsByTitle[ThemeNames.${theme.trim().toUpperCase()}]`
                                );
                                rowObject[header] = `[${themes.join(', ')}]`;
                            }
                        } else if (header === "categoryId") {
                            rowObject[header] = `categoryMap[CategoryWorkNames.${cell.value.toUpperCase()}]`;
                        } else {
                            rowObject[header] = cell.value;
                        }
                    });
                    rows.push(rowObject);
                }
            });

            console.log(rows); // This will output all rows as an array of objects
        };

        reader.readAsArrayBuffer(file);
    }

    return (
        <input
            type="file"
            onChange={(e) => handleUpload(e)}
        />
    )
}


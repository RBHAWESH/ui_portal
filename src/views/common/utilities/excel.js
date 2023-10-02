import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';
/* load 'fs' for readFile and writeFile support */
// import * as fs from 'fs';
// XLSX.set_fs(fs);


const xlsxfile = {
    read: async (e) => {
        let dataParse = [];
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        return new Promise(function (resolve) {
            reader.onload = async function (e) {
                var data = e.target.result;
                let readedData = XLSX.read(data, { type: 'binary' });
                const wsname = readedData.SheetNames[0];
                const ws = readedData.Sheets[wsname];
                console.log("Sheetname", wsname);
                /* Convert array to json*/
                dataParse = await XLSX.utils.sheet_to_json(ws, { header: 1 });
                resolve(dataParse);
            };
            reader.readAsBinaryString(f);
        });
    }
};
export default xlsxfile;
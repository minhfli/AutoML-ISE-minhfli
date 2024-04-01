import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import CustomSelect from "./Select";
type CsvRow = { [key: string]: string };

type DialogProps = {
  folderFiles: File[];
};

const Dialog: React.FC<DialogProps> = ({ folderFiles }) => {
  const [selectedCsv, setSelectedCsv] = useState<string>("");
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [selectedTargetColumn, setSelectedTargetColumn] = useState('');

  // Handler for changing the selected target column
  const handleTargetColumnSelect = (newValue: string | null) => {
    setSelectedTargetColumn(newValue || ''); // Update the state, fallback to an empty string if null
  };

  // Handler for when a new target column is selected
  // const handleTargetColumnSelect = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTargetColumn(event.target.value);
  // };
  const handleCsvSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    if (csvData.length > 0) {
      const types = Object.keys(csvData[0]).map((key) =>
        inferDataTypes(csvData),
      );
      setDataTypes(types ? types.map(String) : []);
    }
    const fileName = event.target.value;
    const file = folderFiles.find((f) => f.name === fileName);
    setSelectedCsv(fileName);

    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setCsvData(results.data as CsvRow[]);
          inferDataTypes(results.data as CsvRow[]);
        },
      });
    }
  };

  const firstColumn = csvData.map((row) => row[Object.keys(row)[0]]);
  const inferDataTypes = (csvData: CsvRow[]) => {
    if (!csvData || csvData.length === 0) return [];

    const firstRow = csvData[0];
    const types = Object.keys(firstRow).map((key) => {
      const sampleValue = firstRow[key];
      if(sampleValue === undefined || sampleValue === null){
        return "string"
      } 

      if (
        !isNaN(parseFloat(sampleValue)) &&
        isFinite(parseFloat(sampleValue))
      ) {
        if (parseFloat(sampleValue) % 1 === 0) {
          return "integer";
        } else {
          return "float";
        }
      }
       else if (
        sampleValue.toLowerCase() === "true" ||
        sampleValue.toLowerCase() === "false"
      ) {
        return "boolean";
      } else if (!isNaN(Date.parse(sampleValue))) {
        return "date";
      } else {
        return "string";
      }
    });

    setDataTypes(types);
  };
  const Train = () => {};
  return (
    <>
      {/* Button to open modal */}
      <button
        className="btn rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() =>
          (
            document.getElementById("my_modal_4") as HTMLDialogElement
          )?.showModal()
        }
      >
        Next
      </button>

      {/* Modal dialog */}
      <dialog id="my_modal_4" className="relative z-50">
        {/* Overlay effect */}
        <div className="fixed inset-0 bg-black opacity-30"></div>

        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white p-6 shadow-xl">
            {/* Table */}
            <div className="overflow-x-auto">
              {/* Dropdown for CSV file selection */}
              <select
                value={selectedCsv}
                onChange={handleCsvSelect}
                className="mb-4 rounded border border-gray-300 p-2"
              >
                <option value="">Select a CSV file</option>
                {folderFiles.map((file) => (
                  <option key={file.name} value={file.name}>
                    {file.name}
                  </option>
                ))}
              </select>

              {/* Table with data */}
              {csvData.length > 0 && (
                <>
                  <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full border-collapse border border-gray-200 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-200 p-3 text-left">
                            Include
                          </th>
                          <th className="border border-gray-200 p-3 text-left">
                            Column Name
                          </th>
                          <th className="border border-gray-200 p-3 text-left">
                            Type
                          </th>
                          <th className="border border-gray-200 p-3 text-left">
                            Example Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(csvData[0]).map((key, index) => (
                          <tr key={key} className="hover:bg-gray-50">
                            <td className="border border-gray-200 p-3 text-center">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="rounded text-blue-600 focus:ring-blue-400"
                              />
                            </td>
                            <td className="border border-gray-200 p-3">
                              {key}
                            </td>
                            <td className="border border-gray-200 p-3">
                              {/* Dropdown for data types */}
                              <select
                                className="block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                defaultValue={dataTypes[index]}
                              >
                                <option value="string">String</option>
                                <option value="integer">Integer</option>
                                <option value="float">Float</option>
                                <option value="boolean">Boolean</option>
                                {/* Add more types as needed */}
                              </select>
                            </td>
                            <td className="border border-gray-200 p-3">
                              {csvData[0][key]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="p-2 mt-2">
                    <label
                      htmlFor="targetColumnSelect"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Target Column
                    </label>
                    <select
                      id="targetColumnSelect"
                      name="targetColumnSelect"
                      value={selectedTargetColumn}
                      onChange={handleTargetColumnSelect}
                      className="mb-4 mt-1 block w-full rounded-md border border-gray-300 p-2 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
                    >
                      <option value="">Select a column</option>
                      {Object.keys(csvData[0]).map((columnName) => (
                        <option key={columnName} value={columnName}>
                          {columnName}
                        </option>
                      ))}
                    </select>

                  </div>
                   */}
                   <div className="p-2 mt-2">
                   <CustomSelect
                    selectedTargetColumn={selectedTargetColumn}
                    handleTargetColumnSelect={handleTargetColumnSelect}
                    csvData={csvData}
                  />
                  </div>
                                                           
                </>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={() =>
                    document
                      .getElementById("my_modal_4")
                      ?.closest("dialog")
                      ?.close()
                  }
                >
                  Close
                </button>
                <button
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={Train}
                >
                  Train
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default Dialog;

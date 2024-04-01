"use client";
import React, { useState, ChangeEvent } from "react";
import Papa, { ParseResult } from "papaparse";
import PaginationControls from "./Pagination";
import Dialog from "./Dialog";
import Select from "react-select";

type CsvRow = {
  [key: string]: string;
};
const CsvParser: React.FC = () => {
  const [selectedCsv, setSelectedCsv] = useState<string>("");
  const [csvFiles, setCsvFiles] = useState<any>([]); // [1
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countPage, setCountPage] = useState<number>(0);
  const [dataTypes, setDataTypes] = useState<any[]>([]);

  const folder = csvFiles;
  const inferDataTypes = (csvData: CsvRow[]) => {
    if (!csvData || csvData.length === 0) return [];

    const firstRow = csvData[0];
    const types = Object.keys(firstRow).map((key) => {
      const sampleValue = firstRow[key];

      if (
        !isNaN(parseFloat(sampleValue)) &&
        isFinite(parseFloat(sampleValue))
      ) {
        if (parseFloat(sampleValue) % 1 === 0) {
          return "integer";
        } else {
          return "float";
        }
      } else if (
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

  //total pages
  const totalPages = Math.ceil(csvData.length / 10);

  const handlePageChange = (newPage: any) => {
    // Validation to ensure newPage is within the valid range
    const validNewPage = Math.min(Math.max(1, newPage), totalPages);
    setCountPage(validNewPage - 1); // Adjust if you are using zero-based index for countPage
  };

  const handleFolderUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const folderFiles = Array.from(event.target.files);
      const csvFiles = folderFiles.filter((file) =>
        file.name.toLowerCase().endsWith(".csv"),
      );
      setCsvFiles(csvFiles);
      setSelectedCsv("");
      setCsvData([]);
    }
  };
  const handleCsvSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountPage(0); // Reset page count on file change
    setErrorMessage(""); // Reset error message on file change
    const fileName = event.target.value;
    setSelectedCsv(fileName);

    const filetoParse = csvFiles.find((file: any) => file.name === fileName);

    if (filetoParse) {
      Papa.parse(filetoParse, {
        complete: (result: ParseResult<CsvRow>) => {
          if (result.errors.length > 0) {
            setErrorMessage("Error parsing CSV file. Please check the format.");
            console.log(result.errors);
          } else {
            console.log("Parsed CSV result:", result);
            setCsvData(result.data);

            // Infer data types
            inferDataTypes(result.data);
            console.log("Data types:", dataTypes);
          }
        },
        error: (error) => {
          setErrorMessage(`Error parsing CSV file: ${error.message}`);
        },
        header: true,
        skipEmptyLines: true,
        quoteChar: '"', // Set this to true if your CSV file has a header row
      });
    }
  };

  const startIndex = countPage * 10;
  const endIndex = startIndex + 10;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="max-w-full rounded-lg bg-gray-100 p-6 shadow-lg">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Prepare your data for Tabular Data Classification (Multi-class)
        </h2>
        <p className="text-gray-600">
          AutoTrain needs example data, which can be uploaded as files in the
          <code className="mx-1 rounded bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700">
            .csv
          </code>
          or
          <code className="mx-1 rounded bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700">
            .jsonl
          </code>
          format. Each file should have at least one column for
          <code className="mx-1 rounded bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700">
            target
          </code>
          . It might also have one optional column for
          <code className="mx-1 rounded bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700">
            id
          </code>
          .
        </p>
      </div>

      {/* File Input and Error Message */}
      <div className="my-4">
        <label className="block">
          <span className="sr-only">Choose file</span>
          <input
            id="folderUpload"
            type="file"
            className="block w-full text-sm text-gray-500
            file:mr-4 file:rounded-full file:border-0
            file:bg-gray-200 file:px-4
            file:py-2 file:text-sm
            file:font-semibold file:text-gray-700
            hover:file:bg-gray-300"
            webkitdirectory=""
            onChange={handleFolderUpload}
          />
        </label>
        {csvFiles.length > 0 && (
          <div className="mt-2 flex">
            <label htmlFor="csvFileSelect" className="block">
              <span className="sr-only">Select a CSV file</span>
              <select
                id="csvFileSelect"
                value={selectedCsv}
                onChange={handleCsvSelect}
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-500 md:w-auto"
              >
                <option value="">Select a CSV file</option>
                {csvFiles.map((file: any, index: any) => (
                  <option key={index} value={file.name}>
                    {file.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {errorMessage && (
          <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
        )}
      </div>

      {/* Table */}
      {csvData.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table headers */}
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(csvData[0]).map((header, index, array) => (
                    <th
                      key={header} // Replace 'id' with the unique identifier in your header objec
                      className={`px-2 py-2 font-semibold text-gray-600 ${
                        index !== array.length - 1 ? "border-r" : ""
                      } text-center`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
                {/* Data types row */}
                <tr>
                  {dataTypes.map((type, index) => (
                    <th
                      key={`type-${index}`}
                      className={`px-2 py-2 text-sm text-gray-500 ${
                        index !== dataTypes.length - 1 ? "border-r" : ""
                      } text-center`}
                    >
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {csvData.slice(startIndex, endIndex).map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="hover:bg-gray-50">
                    {""}
                    {/* Use rowIndex as part of the key */}
                    {Object.values(row).map((value, colIndex) => (
                      <td
                        key={`row-${rowIndex}-col-${colIndex}`} // Create a composite key using both rowIndex and colIndex
                        className={`border-t px-4 py-2 text-gray-700 ${
                          colIndex !== Object.values(row).length - 1
                            ? "border-r"
                            : ""
                        } text-center`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="my-4">
            <PaginationControls
              currentPage={countPage + 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <>
            <Dialog folderFiles={folder} />
          </>
        </>
      )}
    </div>
  );
};
export default CsvParser;

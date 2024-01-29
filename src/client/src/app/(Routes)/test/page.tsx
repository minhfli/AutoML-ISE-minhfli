"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Papa, { ParseResult } from "papaparse";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationControls from "./pagination";

type CsvRow = {
  [key: string]: string;
};

const CsvParser: React.FC = () => {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countPage, setCountPage] = useState<number>(0);

  //total pages
  const totalPages = Math.ceil(csvData.length / 10);

  const handlePageChange = (newPage: any) => {
    // Validation to ensure newPage is within the valid range
    const validNewPage = Math.min(Math.max(1, newPage), totalPages);
    setCountPage(validNewPage - 1); // Adjust if you are using zero-based index for countPage
  };
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(""); // Reset error message on file change
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        complete: (result: ParseResult<CsvRow>) => {
          if (result.errors.length > 0) {
            setErrorMessage("Error parsing CSV file. Please check the format.");
            console.log(result.errors);
          } else {
            console.log("Parsed CSV result:", result);
            setCsvData(result.data);
          }
        },
        header: true, // Set this to true if your CSV file has a header row
      });
    }
  };

  const startIndex = countPage * 10;
  const endIndex = startIndex + 10;

  return (
    <div className="mx-auto max-w-full">
      <div className="bg-gray-100 p-8 ">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Prepare your data for Tabular Data Classification (Multi-class)
          </h2>
          <p className="mt-1 text-gray-600">
            AutoTrain needs example data, which can be uploaded as files in the
            .csv or .jsonl format. Each file should have at least one column for{" "}
            <span className="font-semibold">target</span>. It might also have
            one optional column for <span className="font-semibold">id</span>.
          </p>
        </div>
      </div>
      <div className="min-w-full overflow-hidden">
        <table className="w-full bg-white text-xs">
          <thead>
            <tr>
              <th className="border-b border-r border-gray-200 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Quality
              </th>
              <th className="border-b border-r border-gray-200 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Fixed Acidity
              </th>
              <th className="border-b border-r border-gray-200 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Volatile Acidity
              </th>
              <th className="border-b border-r border-gray-200 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Citric Acid
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                5
              </td>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                7.4
              </td>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                0.7
              </td>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                0
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                3
              </td>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                7.8
              </td>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                0.88
              </td>
              <td className="border-b border-r border-gray-200 px-4 py-2 text-center text-sm text-gray-700">
                0
              </td>
            </tr>
            {/* <!-- ... more rows ... --> */}
          </tbody>
        </table>
      </div>

      <div className="container mx-auto p-4 ">
        <div className="mb-4 flex flex-col items-center">
          {" "}
          {/* flex container to center children */}
          <input
            type="file"
            onChange={handleFileUpload}
            className="input input-bordered w-full max-w-xs"
          />
          {errorMessage && (
            <p className="mt-2 text-center text-red-500">{errorMessage}</p>
          )}{" "}
          {/* centered text */}
        </div>

        {csvData.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    {Object.keys(csvData[0]).map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(startIndex, endIndex).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container mx-auto p-4">
              <PaginationControls
                currentPage={countPage + 1} // Adjust if you are using zero-based index for countPage
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CsvParser;

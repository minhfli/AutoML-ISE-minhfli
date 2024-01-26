"use client";
import React, { useState, ChangeEvent, useEffect, useRef, use } from "react";
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

  let searchParams = useSearchParams();
  const search = searchParams.get("p");
  console.log(search);
  const router = useRouter();

  useEffect(() => {
    if (search) {
      setCountPage(parseInt(search));
    }
  }, [search]);
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
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileUpload}
          className="input input-bordered w-full max-w-xs"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
  );
};

export default CsvParser;

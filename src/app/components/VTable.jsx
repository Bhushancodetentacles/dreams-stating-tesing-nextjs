/* eslint-disable react/prop-types */
"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";

import Stack from "@mui/material/Stack";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = ({
  cols,
  data,
  totalPages,
  page,
  handlePageChange,
  handleRowsPerPageChange,
  isTableLoading,
  isPagination,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  useEffect(() => {
    setSortConfig({ key: "default", direction: "desc" });
  }, []);

  const sortedData = () => {
    if (sortConfig.key !== null) {
      const sortedItems = [...data];
      sortedItems.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (typeof valueA === "number" && typeof valueB === "number") {
          // Sort numbers
          return sortConfig.direction === "asc"
            ? valueA - valueB
            : valueB - valueA;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          // Sort strings
          const stringA = valueA.toLowerCase();
          const stringB = valueB.toLowerCase();
          if (stringA < stringB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (stringA > stringB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        if (valueA instanceof Date && valueB instanceof Date) {
          // Sort dates
          if (valueA < valueB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        // Convert strings to dates and compare
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        if (!isNaN(dateA) && !isNaN(dateB)) {
          if (dateA < dateB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (dateA > dateB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        // Default comparison (considering unknown types as strings)
        const unknownStringA = String(valueA).toLowerCase();
        const unknownStringB = String(valueB).toLowerCase();
        if (unknownStringA < unknownStringB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (unknownStringA > unknownStringB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      return sortedItems;
    }

    return data;
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    handleRowsPerPageChange(value);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-[16px] table-content shadow-hover">
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              {cols.map((col, index) => (
                <th
                  key={index}
                  style={{
                    width: col.width,
                    cursor: col.sortable ? "pointer" : "default",
                  }}
                  className={`px-6 py-4 text-accent text-sm font-semibold main-text bg-accentshade tracking-wider table-th ${
                    col.title === "Action" ? "text-center" : "text-left"
                  }`}
                  onClick={() => (col.sortable ? requestSort(col.key) : null)}
                >
                  {col.title}
                  {col.sortable && (
                    <span>
                      {sortConfig.key === col.key && (
                        <span>
                          {sortConfig.direction === "asc" ? " 🔼" : " 🔽"}
                        </span>
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {isTableLoading ? (
              // Show a loading indicator while data is loading
              <tr>
                <td colSpan={cols?.length}>
                  <div className="loader ">
                    <SkeletonTheme
                      baseColor="#dddddd99"
                      highlightColor="#dddddd99"
                      height={50}
                    >
                      <Skeleton count={10} />
                    </SkeletonTheme>
                  </div>
                </td>
              </tr>
            ) : data?.length === 0 ? (
              // Show "No data found" message when there is no data
              <tr>
                <td
                  colSpan={cols?.length}
                  className="px-6 py-4 whitespace-nowrap text-center"
                >
                  {/* <img src={nodata} alt="nodata" width="80"/> */}
                  No data Available
                </td>
              </tr>
            ) : (
              // Render the data rows when data is available
              sortedData().map((item, rowIndex) => (
                <tr key={rowIndex} className="hovertr hover:bg-accentshade  ">
                  {cols.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider"
                    >
                      {col.render
                        ? col.render(item, rowIndex)
                        : item[col.dataIndex]
                        ? item[col.dataIndex]
                        : "-"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isPagination && (
        <Stack spacing={2} direction="row" className="flex justify-between mt-2">
          <div className="dataTables_length">
            <label>
              <select
                className="page-select"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span> per page</span>
            </label>
          </div>
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={totalPages}
            color="primary"
            variant="outlined"
            shape="rounded"
            className="btn "
          />
        </Stack>
      )}
    </>
  );
};

export default Table;

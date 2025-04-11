/* eslint-disable no-unused-vars, eqeqeq */
import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const ReusableTable = ({ collections, paginationChange, page }) => {

  const navigate = useNavigate();

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" >S.no</TableCell>
              {collections?.columns?.map((col, index) => (
                <TableCell key={index} align={col?.align || "left"} sx={{ whiteSpace: "nowrap" }}>{col?.Header}</TableCell>
              ))}

            </TableRow>
          </TableHead>
          {collections?.row?.length <= 0 ? <TableBody>

            <TableRow>
              <TableCell align={"center"} colSpan={collections?.columns?.length}>
                No Data Found
              </TableCell>

            </TableRow>

          </TableBody> : <TableBody>
            {collections?.row?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="left" >{rowIndex + 1}</TableCell>
                {collections?.columns?.map((col, colIndex) => (
                  <TableCell key={colIndex} align={col?.align || "left"}>
                    {row[col?.accessor]} {/* Accessing data dynamically using accessor */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>}


        </Table>

      </TableContainer>
      {collections?.pagecount > 0 && <Pagination count={collections?.pagecount} page={page} variant="outlined" shape="rounded" className="mt-20 pagi" onChange={(e, v) => { paginationChange(v); }} />}
    </>

  );
};

export default ReusableTable;

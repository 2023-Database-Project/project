import {
  Card,
  CardFooter,
  Typography,
  Button,
}
  from "@material-tailwind/react";
import { useState, useEffect, use } from "react";
import { EditMenu } from "./edit-menu";

//傳入表格行資料型態(必須包含id)
interface TableRowProps {
  id: number;
}

//傳入表格資料型態
interface TableDataProps {
  role: string;
  tableHead: string[];
  tableRows: TableRowProps[];
  setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

// 資料庫資料表格
export function Table({role, tableHead, tableRows, setNeedUpdate }: TableDataProps) {
  //表格列元素
  const TableHeader = ({ head, width }: { head: string, width: number }) => (
    <th
      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
      style={{ width: `${width}%` }}
    >
      <Typography
        placeholder
        variant="small"
        color="blue-gray"
        className="font-normal leading-none opacity-70"
      >
        {head}
      </Typography>
    </th>
  );

  //表格行
  const TableRow = (tableRow: TableRowProps) => {
    const { id } = tableRow;
    return (
      <tr key={id}>
        {Object.values(tableRow)
          .filter((value) => value !== undefined)
          .map((value, index) => (
            <td className="p-4 border-b border-blue-gray-50">
              <Typography placeholder variant="small" color="blue-gray" className="font-normal">
                {value}
              </Typography>
            </td>
          ))}
        <td className="p-4 border-b border-blue-gray-50">
          <EditMenu role={role} id={id} setNeedUpdate={setNeedUpdate} />
        </td>
      </tr>
    );
  };

  return (
    <table className="table-auto text-left">
      <thead>
        <tr>
          {tableHead.map((head) => (
            <TableHeader head={head} width={100 / (tableHead.length - 1)} />
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((rowData, index) => {
          return <TableRow {...rowData} />;
        })}
      </tbody>
    </table>
  );
}
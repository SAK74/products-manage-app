import { TableCell } from "@mui/material";
import { Product } from "types";

export default function SimplyProduct({ id, name, year }: Product) {
  return (
    <>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{year}</TableCell>
    </>
  );
}

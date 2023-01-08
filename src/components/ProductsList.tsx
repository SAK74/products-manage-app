import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { fetchData, selectAllProd } from "reducers/products";
import { useReduxDispatch, useReduxSelector } from "store";
import ProductComponent from "./Product";

export default function ProductsList() {
  const dispatch = useReduxDispatch();
  const state = useReduxSelector(selectAllProd);
  // console.log(state);
  const rows = state.map((product) => (
    <TableRow key={product.id} sx={{ background: product.color }}>
      <ProductComponent {...product} />
    </TableRow>
  ));
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <TableContainer component={Paper} sx={{ width: 2 / 5 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}

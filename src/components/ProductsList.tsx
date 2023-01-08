import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ChangeEventHandler, MouseEvent, useEffect } from "react";
import { fetchData, selectAllProd } from "reducers/products";
import { useReduxDispatch, useReduxSelector } from "store";
import ProductComponent from "./Product";

export default function ProductsList() {
  const dispatch = useReduxDispatch();
  const products = useReduxSelector(selectAllProd);
  const { page, per_page, total } = useReduxSelector((state) => state.products);
  const rows = products.map((product) => (
    <TableRow key={product.id} sx={{ background: product.color }}>
      <ProductComponent {...product} />
    </TableRow>
  ));
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const handlePageChange = (
    ev: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    dispatch(fetchData({ page: page + 1 }));
  };
  const handlePerPageChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    dispatch(fetchData({ per_page: +value }));
  };
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
        <TableFooter>
          <TableRow>
            <TablePagination
              count={total}
              page={page - 1}
              rowsPerPage={per_page}
              onPageChange={handlePageChange}
              rowsPerPageOptions={[5, 6, 10, { label: "All", value: -1 }]}
              onRowsPerPageChange={handlePerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

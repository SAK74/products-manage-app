import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  TableCell,
  TableRow,
  Typography,
  Zoom,
} from "@mui/material";
import { useState } from "react";
import { Product } from "types";

export default function SimplyProduct({
  id,
  name,
  year,
  color,
  pantone_value,
}: Product) {
  const [open, setOpen] = useState(false);
  const switchOpen = () => setOpen((prev) => !prev);
  return (
    <>
      <TableRow
        data-testid="product"
        sx={{ background: color, cursor: "pointer" }}
        onClick={switchOpen}
      >
        <TableCell>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{year}</TableCell>
      </TableRow>
      <Modal open={open} onClose={switchOpen}>
        <Zoom in={open}>
          <Card
            sx={{
              width: 1 / 3,
              position: "fixed",
              left: "50%",
              right: "50%",
              translate: "-50% 50%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardHeader title={id}></CardHeader>
            <CardContent>
              <Typography sx={{ background: color }}>{name}</Typography>
              <Typography>{year}</Typography>
              <Typography>{pantone_value}</Typography>
            </CardContent>
            <CardActions sx={{ alignSelf: "flex-end" }}>
              <Button children="close" onClick={switchOpen} />
            </CardActions>
          </Card>
        </Zoom>
      </Modal>
    </>
  );
}

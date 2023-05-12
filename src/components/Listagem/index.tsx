import { Children, FC, ReactNode, cloneElement } from "react";

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Stack,
  Card,
  Typography,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./styles";
import loadingSrc from "assets/loading.svg";

export interface ICells {
  id: string;
  label: string;
}

interface IListagem {
  data: any[];
  loading: boolean;
  cells: ICells[];
  children: ReactNode;
}

const Listagem: FC<IListagem> = (props) => {
  const { data, loading, cells, children } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        width: "100%",
      }}
    >
      {data.length === 0 ? (
        <Stack
          sx={{ width: "100%", padding: "10rem 0" }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography component="p">Lista vazia</Typography>
        </Stack>
      ) : !data || loading ? (
        <Stack
          sx={{ width: "100%" }}
          alignItems="center"
          justifyContent="center"
        >
          <img
            alt="loading"
            style={{
              margin: "0.2rem auto auto",
            }}
            src={loadingSrc}
          />
        </Stack>
      ) : (
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="medium">
            <TableHead sx={{ borderBottom: "1px solid #e0e0e0" }}>
              <StyledTableRow>
                {cells.map((cell) => {
                  return (
                    <StyledTableCell key={cell.id}>
                      <Stack
                        sx={{
                          width: "100%",
                        }}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {cell.label}
                      </Stack>
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell
                  sx={{
                    padding: "5px 3px",
                    borderLeft: "1px solid #e0e0e0",
                  }}
                ></StyledTableCell>
              </StyledTableRow>
            </TableHead>

            <TableBody sx={{ width: "100%" }}>
              {data.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return Children.map(children, (child: any) =>
                  cloneElement(child, {
                    row,
                    labelId,
                  }),
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default Listagem;

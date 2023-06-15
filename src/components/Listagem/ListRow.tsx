/* eslint-disable prettier/prettier */
import { FC } from "react";
import { useHistory } from "react-router-dom";

import { Stack, IconButton } from "@mui/material";

import {
  EditRounded as EditRoundedIcon,
  DeleteForeverRounded as DeleteForeverRoundedIcon,
  Pageview as PageviewIcon,
} from "@mui/icons-material";

import { StyledTableCell, StyledTableRow } from "components/Listagem/styles";
import { ICells } from "components/Listagem";
import DeleteDialog from "components/DeleteDialog";

interface IRow {
  cells: ICells[];
  cod_id: string;
  link: string;
  deleteFnc?: (row_id: any) => void;
  row?: any;
  labelId?: string;
}

const ListRow: FC<IRow> = (props) => {
  const { cells, cod_id, deleteFnc, link, row, labelId } = props;

  const history = useHistory();

  const row_id = row[cod_id];

  return (
    <StyledTableRow hover tabIndex={-1} key={row_id}>
      {cells.map((cell) => {
        const valueSplit = cell.id.split(".");

        let value = row;

        valueSplit.forEach((key) => {
          value = value[key];
        });

        return (
          <StyledTableCell id={labelId} size="small" key={cell.id}>
            {value}
          </StyledTableCell>
        );
      })}

      <StyledTableCell id={labelId} size="small" align="right">
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              history.push(`${link}/${row_id}`);
            }}
          >
            <PageviewIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              history.push(`${link}/${row_id}`);
            }}
          >
            <EditRoundedIcon />
          </IconButton>
          {deleteFnc && (
            <DeleteDialog deleteFnc={deleteFnc} row_id={row_id}>
              <DeleteForeverRoundedIcon />
            </DeleteDialog>
          )}
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ListRow;

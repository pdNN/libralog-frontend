import { TableCell, TableRow, styled } from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.contrastText,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#fff",
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "0 10px",
  },
  "&:first-of-type": {
    borderLeft: "0px",
  },
  borderLeft: "1px solid #e0e0e0",
}));

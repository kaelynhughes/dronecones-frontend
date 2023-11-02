import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order, UserType } from "../../types";
import useGetHistory from "../../services/customer/useGetHistory";
import {
  AppBar,
  Box,
  Card,
  Collapse,
  ListItemButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useStore } from "../../store";
import AddIcon from "@mui/icons-material/Add";
import { getConeString, getPriceString } from "../../services/helperFunctions";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function CustomerHistoryPage() {
  const [history, setHistory] = useState<Order[] | null>();
  const [openRow, setOpenRow] = useState<number | null>();
  const fetchHistory = async () => {
    const historyList = await useGetHistory();
    setHistory(historyList);
  };
  const user = useStore((state) => state.user);

  const tableCellStyle = {
    color: "white",
    fontSize: "16px",
    fontFamily: "pixelfont",
  };

  const tableCellStyleHeader = {
    color: "white",
    fontSize: "20px",
    fontFamily: "pixelfont",
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      {(user.userType === UserType.CUSTOMER ||
        user.userType === UserType.MANAGER) && (
        <Box
          sx={{
            height: "92vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ ...tableCellStyle, flexGrow: 1 }}
              >
                Customer History
              </Typography>
            </Toolbar>
          </AppBar>
          {history ? (
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "100%",
                width: "100%",
                mt: 2,
                overflow: "auto",
                flexGrow: 1,
              }}
            >
              <Table
                stickyHeader
                sx={{
                  width: "100%",
                  tableLayout: "fixed",
                  borderCollapse: "separate",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...tableCellStyleHeader, width: "40%" }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ ...tableCellStyleHeader, width: "35%" }}>
                      Contents
                    </TableCell>
                    <TableCell sx={{ ...tableCellStyleHeader, width: "20%" }}>
                      Cost
                    </TableCell>
                    <TableCell
                      sx={{ ...tableCellStyleHeader, width: "5%" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((item) => (
                    <>
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={tableCellStyle}
                          component="th"
                          scope="item"
                        >
                          {item.timestamp.toDateString()}
                        </TableCell>
                        <TableCell
                          sx={tableCellStyle}
                          component="th"
                          scope="item"
                        >
                          {item.cones.length} Cone
                          {item.cones.length > 1 ? "s" : ""}
                        </TableCell>
                        <TableCell
                          sx={tableCellStyle}
                          component="th"
                          scope="item"
                        >
                          {getPriceString(item.totalPrice)}
                        </TableCell>
                        <TableCell
                          sx={tableCellStyle}
                          component="th"
                          scope="item"
                        >
                          <Button
                            onClick={() => {
                              openRow == item.id
                                ? setOpenRow(null)
                                : setOpenRow(item.id);
                            }}
                          >
                            {openRow == item.id ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {/* <Collapse
                        in={openRow == item.id}
                        style={{ width: "100%" }}
                      > */}
                      <TableRow>
                        <TableCell
                          sx={{ fontFamily: "pixelfont", width: "100%" }}
                          colSpan={4}
                        >
                          {item.cones.map((cone) => (
                            <Typography
                              sx={{
                                color: "white",
                                fontSize: "12px",
                                fontFamily: "pixelfont",
                              }}
                            >
                              {getConeString(cone)}
                            </Typography>
                          ))}
                        </TableCell>
                      </TableRow>
                      {/* <Card sx={{ width: "100%", padding: 2 }}></Card> */}
                      {/* </Collapse> */}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>No history</h1>
          )}
        </Box>
      )}
    </>
  );
}

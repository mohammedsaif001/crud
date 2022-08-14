import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
function createData(id, name, age, mobile, address, modify) {
  return { id, name, age, mobile, address, modify };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Details = () => {
  const { enqueueSnackbar } = useSnackbar();
  let location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [delId, setDelId] = useState("");
  const handleClickOpen = (id) => {
    setDelId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const deleteURL = `http://192.168.1.143:8000/api/deleteProfile/${delId}`;
    console.log(delId);
    axios
      .delete(deleteURL)
      .then((res) => {
        console.log(res);
        setOpen(false);
        // setLocationMessage({ msg: "User Deleted", variant: "error" });
        refreshData();
        // handleClick();

        enqueueSnackbar("User Deleted", { variant: "error" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rows = data
    ? data.map((row) =>
        createData(
          row._id,
          row.name,
          row.age,
          row.ph,
          row.address,
          <>
            <IconButton
              aria-label="edit"
              onClick={() =>
                navigate(`/editPage/${row._id}`, {
                  state: [row.name, row.age, row.ph, row.address],
                })
              }
            >
              <ModeEditIcon color="success" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpen(row._id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </>
        )
      )
    : "";

  const [locationMessage, setLocationMessage] = useState({
    msg: "",
    variant: "",
  });
  function refreshData() {
    axios.get(getUrl).then((res) => {
      setData(res.data.data);
      // console.log(res.data.data);
    });
  }
  const getUrl = "http://192.168.1.143:8000/api/getAllUsers";

  useEffect(() => {
    refreshData();
    // setOpenMessage(false);
    // if (location.state?.msg) {
    //   setLocationMessage(location.state);
    //   console.log(location.state);
    //   handleClick();
    // }
  }, []);
  // useEffect(() => {
  //   refreshData();
  //   setOpenMessage(false);
  //   if (location.state?.msg) {
  //     setLocationMessage(location.state);
  //     console.log(location.state);
  //     handleClick();
  //   }
  // }, [location?.state]);

  const handleCloseDelete = (event, reason) => {
    // location.state = { msg: "", variant: "" };
    // setLocationMessage({ msg: "", variant: "" });
    if (reason === "clickaway") {
      // location.state = { msg: "", variant: "" };
      // setLocationMessage({ msg: "", variant: "" });
      return;
    }
    setOpenMessage(false);
  };

  const handleClick = () => {
    setOpenMessage(true);
    // location.state = { msg: "", variant: "" };
    // setLocationMessage({ msg: "", variant: "" });
  };

  return (
    <>
      <div style={{ margin: "2% 20%" }}>
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          direction="row"
          sx={{ mb: 2 }}
        >
          <Link
            to="/newpage"
            style={{ textDecoration: "none" }}
            state={["", "", "", ""]}
          >
            <Button
              endIcon={<AddCircleIcon />}
              color="success"
              variant="contained"
            >
              Add New
            </Button>
          </Link>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ? rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.age}</TableCell>
                      <TableCell align="center">{row.mobile}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.modify}</TableCell>
                    </TableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog Pop Up */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are You Sure You Want to Delete ?"}</DialogTitle>
          <DialogActions>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              endIcon={<CheckIcon />}
              size="small"
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              startIcon={<CancelIcon />}
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Display User Message as Deleted */}
        <Snackbar
          open={openMessage}
          autoHideDuration={6000}
          onClose={handleCloseDelete}
        >
          {
            <Alert
              onClose={handleCloseDelete}
              severity={locationMessage?.variant}
              sx={{ width: "100%" }}
            >
              {locationMessage?.msg}
            </Alert>
          }
        </Snackbar>
        {console.log(locationMessage)}
      </div>
    </>
  );
};

export default Details;

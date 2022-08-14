import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BackspaceIcon from "@mui/icons-material/Backspace";
import React, { useState, useEffect } from "react";
import { Button, InputAdornment } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openMessage, setOpenMessage] = React.useState(false);
  const location = useLocation();
  const path = useParams();
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const [nameEdit, ageEdit, phoneEdit, addressEdit] = location.state;
    console.log(path.id);
    setName(nameEdit);
    setAddress(addressEdit);
    setAge(parseInt(ageEdit));
    setPhone(phoneEdit);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (path.id) {
      const putURL = `http://192.168.1.143:8000/api/updateProfile/${path.id}`;
      axios
        .put(putURL, {
          name: name,
          age: age,
          ph: phone,
          address: address,
        })
        .then((res) => {
          let message = res.data.msg;
          console.log(res);
          console.log(res.data.msg);
          setMessage(message);
          enqueueSnackbar(message, { variant: "success" });
          navigate("/");
          // handleClick();
        })
        .catch((err) => {
          let statusCode = err.response.data.status;
          if (statusCode === 409) {
            enqueueSnackbar("User Already Exist", { variant: "error" });
          } else if (statusCode === 404) {
            enqueueSnackbar("User Not Found", { variant: "error" });
          } else if (statusCode === 500) {
            enqueueSnackbar("Internal Server Error", { variant: "alert" });
          } else if (statusCode === 400) {
            let msg = err.response.data.data[0];
            console.log(msg);
            enqueueSnackbar(msg, { variant: "error" });
          }
        });
      console.log(name, age, typeof age, typeof phone, address);
    } else {
      const postURL = `http://192.168.1.143:8000/api/createProfile`;
      axios
        .post(postURL, {
          name: name,
          age: age,
          ph: phone,
          address: address,
        })
        .then((res) => {
          let message = res.data.msg;
          console.log(res);
          setMessage(res.data.msg);
          // handleClick();
          // navigate("/", {
          //   state: { msg: message, variant: "success" },
          // });
          // useSnackbar()
          enqueueSnackbar(message, { variant: "success" });
          navigate("/");
        })
        .catch((err) => {
          // console.log(err);
          let statusCode = err.response.data.status;
          if (statusCode === 409) {
            enqueueSnackbar("User Already Exist", { variant: "error" });
          } else if (statusCode === 404) {
            enqueueSnackbar("User Not Found", { variant: "error" });
          } else if (statusCode === 500) {
            enqueueSnackbar("Internal Server Error", { variant: "alert" });
          } else if (statusCode === 400) {
            let msg = err.response.data.data[0];
            console.log(msg);
            enqueueSnackbar(msg, { variant: "error" });
          }
          // setErrMessage(msg.trim([]));
          // setOpenMessage(true);
          // console.log(errMessage);
        });
      console.log(name, age, typeof phone, address);
    }
  };

  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleClick = () => {
    setOpenMessage(true);
  };

  const [errorText, setErrorText] = useState();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          style={{ margin: "10% 34%" }}
        >
          <TextField
            required
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            // helperText={name === "" ? "name" : ""}
            // onInvalid={(e) => e.setCustomValidity("Name Mandate")}
            // {...(error:true,helperText:"Name")}
            error={name ? false : true}
            // {...(errorText && { error: true, helperText: errorText })}
            onInvalid={(e) => e.target.setCustomValidity("Enter Your Name")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <TextField
            required
            id="age"
            label="Age"
            type="number"
            onChange={(e) => setAge(parseInt(e.target.value))}
            value={age ? age : ""}
            onInvalid={(e) => e.target.setCustomValidity("Age is Required")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <TextField
            required
            id="mobile"
            label="Mobile"
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
              minLength: 10,
            }}
            onChange={(e) => setPhone(String(e.target.value))}
            value={String(phone)}
            onInvalid={(e) => e.target.setCustomValidity("Enter Mobile Number")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <TextField
            id="address"
            label="Address"
            multiline
            required
            rows={3}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            onInvalid={(e) => e.target.setCustomValidity("Address is Required")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Button
              variant="contained"
              color="success"
              endIcon={<SendRoundedIcon />}
              type="submit"
            >
              {path.id ? "Update" : "Submit"}
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<BackspaceIcon />}
              onClick={() => {
                navigate(`/`);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
      {/* Display User Message as Created New User */}
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleCloseDelete}
      >
        {message ? (
          <Alert
            onClose={handleCloseDelete}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        ) : errMessage ? (
          <Alert
            onClose={handleCloseDelete}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errMessage}
          </Alert>
        ) : (
          ""
        )}
        {/* <Alert
          onClose={handleCloseDelete}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message ? message : errMessage}
        </Alert> */}
        {console.log(message)}
      </Snackbar>
    </>
  );
};

export default NewPage;

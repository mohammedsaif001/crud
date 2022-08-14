import { Button, Modal, Stack } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid red",
  boxShadow: 24,
  p: 4,
};
const DeleteModal = () => {
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  const [open, setopen] = useState(true);
  return (
    <div style={{ marginTop: "10%" }}>
      {/* <Button onClick={handleOpen} color="error">
        <DeleteForeverIcon />
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Are You Sure You Want to Delete ?
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            margin="2% 0 0 0"
          >
            <Button
              variant="contained"
              color="error"
              endIcon={<CheckIcon />}
              size="small"
            >
              Yes
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CancelIcon />}
                size="small"
              >
                Cancel
              </Button>
            </Link>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;

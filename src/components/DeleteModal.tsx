import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { productApi } from "../store/products/services";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { setIsClose } from "../store/modal/slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function DeleteModal() {
  const [deleteProduct] = productApi.useDeleteProductMutation();
  const open = useSelector((state: RootState) => state.deleteModalSlice.open);
  const _id = useSelector((state: RootState) => state.deleteModalSlice._id!);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={open}
        onClose={() => dispatch(setIsClose(false))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Attention !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Voulez-vous vraiment supprimer ce produit ?
          </Typography>
          <Button onClick={() => dispatch(setIsClose(false))}>Non</Button>
          <Button
            color="error"
            onClick={() => {
              deleteProduct({ _id });
              dispatch(setIsClose(false));
            }}
          >
            Oui
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

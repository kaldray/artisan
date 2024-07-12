import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setProduct } from "../store/product/slice";

type FormActionProps = {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function FormAction({ handleFormSubmit }: FormActionProps) {
  const product = useSelector((state: RootState) => state.productSlice);
  const dispatch = useDispatch();
  return (
    <>
      <Box
        maxWidth={["80%", "80%", "60%"]}
        m={"auto"}
        component="form"
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
        display={"flex"}
        flexWrap={"wrap"}
        flex={1}
        justifyContent={"center"}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
      >
        <TextField
          style={{ flex: "1 1 100%" }}
          id="name"
          onChange={(e) => {
            dispatch(
              setProduct({
                name: e.currentTarget.value as string,
              }),
            );
          }}
          value={product?.name}
          name="name"
          label="Nom"
          required
          variant="filled"
        />
        <FormControl style={{ flex: "1 1 100%" }}>
          <InputLabel variant="standard" htmlFor="type">
            Age
          </InputLabel>
          <NativeSelect
            defaultValue={product?.type ?? "phone"}
            onChange={(e) => {
              dispatch(
                setProduct({
                  type: e.currentTarget.value as string,
                }),
              );
            }}
            inputProps={{
              name: "type",
              id: "type",
            }}
          >
            <option value={"phone"}>Phone</option>
            <option value={"tv"}>TV</option>
          </NativeSelect>
        </FormControl>
        <TextField
          style={{ flex: "1 1 100%" }}
          id="price"
          name="price"
          type="number"
          value={product?.price ?? ""}
          onChange={(e) => {
            dispatch(
              setProduct({
                price: +e.currentTarget.value as unknown as number,
              }),
            );
          }}
          required
          label="Prix"
          variant="filled"
        />
        <TextField
          style={{ flex: "1 1 100%" }}
          id="rating"
          name="rating"
          required
          type="number"
          value={product?.rating ?? ""}
          onChange={(e) => {
            dispatch(
              setProduct({
                rating: +e.currentTarget.value as unknown as number,
              }),
            );
          }}
          label="Note"
          variant="filled"
        />
        <TextField
          style={{ flex: "1 1 100%" }}
          id="warranty_years"
          name="warranty_years"
          required
          value={product?.warranty_years ?? ""}
          onChange={(e) => {
            dispatch(
              setProduct({
                warranty_years: +e.currentTarget.value as unknown as number,
              }),
            );
          }}
          type="number"
          label="Garantie"
          variant="filled"
        />
        <FormControl style={{ flex: "1 1 100%" }}>
          <InputLabel variant="standard" htmlFor="available">
            Disponible
          </InputLabel>
          <NativeSelect
            onChange={(e) => {
              dispatch(
                setProduct({
                  available: e.currentTarget.value === "true",
                }),
              );
            }}
            defaultValue={product?.available ?? "true"}
            inputProps={{
              name: "available",
              id: "available",
            }}
          >
            <option value={"false"}>Non</option>
            <option value={"true"}>Oui</option>
          </NativeSelect>
        </FormControl>
        <Button type="submit">
          <p>{product._id === "" ? "Ajouter" : "Modifier"}</p>
        </Button>
      </Box>
    </>
  );
}

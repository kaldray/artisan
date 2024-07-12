import {
  createLazyFileRoute,
  Link as RouterLink,
  useNavigate,
} from "@tanstack/react-router";
import { Box, Link } from "@mui/material";
import React, { type FormEvent } from "react";
import { productApi } from "../../store/products/services";
import { FormAction } from "../../components/FormAction";
import { useDispatch } from "react-redux";
import { reset } from "../../store/product/slice";

export const Route = createLazyFileRoute("/products/add")({
  component: Add,
});

function Add() {
  const [addProduct] = productApi.useAddProductMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name") as string,
      type: form.get("type") as string,
      price: form.get("price") as unknown as number,
      rating: form.get("rating") as unknown as number,
      warranty_years: form.get("warranty_years") as unknown as number,
      available: form.get("available") as unknown as boolean,
    };
    addProduct(payload);
    navigate({ to: "/" });
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"start"} pb={5}>
        <Link component={RouterLink} to="/">
          Retour
        </Link>
        <FormAction handleFormSubmit={handleFormSubmit} />
      </Box>
    </>
  );
}

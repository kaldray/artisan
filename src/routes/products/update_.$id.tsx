import * as React from "react";
import { Box } from "@mui/material";
import {
  createFileRoute,
  Link as RouterLink,
  useNavigate,
} from "@tanstack/react-router";
import { Link } from "@mui/material";
import { FormAction } from "../../components/FormAction";
import { productApi } from "../../store/products/services";

export const Route = createFileRoute("/products/update/$id")({
  component: Update,
});

function Update() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [updateProduct] = productApi.useUpdateProductMutation();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      _id: id,
      name: form.get("name") as string,
      type: form.get("type") as string,
      price: form.get("price") as unknown as number,
      rating: form.get("rating") as unknown as number,
      warranty_years: form.get("warranty_years") as unknown as number,
      available: form.get("available") as unknown as boolean,
    };
    updateProduct(payload);
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

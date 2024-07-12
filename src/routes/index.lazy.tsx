import {
  createLazyFileRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { productApi } from "../store/products/services";
import type { Products } from "../store/products/type";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Link,
} from "@mui/material";

import { DeleteModal } from "../components/DeleteModal";
import { useDispatch } from "react-redux";
import { setId, setIsOpen } from "../store/modal/slice";
import { setProduct } from "../store/product/slice";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

function Home() {
  const { data } = productApi.useGetProductsQuery();

  return (
    <>
      <Box display={"flex"} justifyContent={"start"} pb={5}>
        <Link component={RouterLink} to="products/add">
          Ajouter un produit
        </Link>
      </Box>
      {data && data.length >= 1 ? (
        <ProductList data={data} />
      ) : (
        <h1>Aucun produit !</h1>
      )}
    </>
  );
}

function ProductList({ data: products }: { data: Products }) {
  const dispatch = useDispatch();
  return (
    <>
      <Box pb={4}>
        <TableContainer component={Paper} title="Liste des produits">
          <Table sx={{ minWidth: 650 }} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Disponible</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Garantie</TableCell>
                <TableCell>Modifier</TableCell>
                <TableCell>Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">
                    {row.available ? "Oui" : "Non"}
                  </TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.rating}</TableCell>
                  <TableCell align="center">{row.warranty_years}</TableCell>
                  <TableCell align="center">
                    <Link
                      component={RouterLink}
                      to="/products/update/$id"
                      params={{ id: String(row._id) }}
                      onClick={() => {
                        dispatch(setProduct(row));
                      }}
                    >
                      Modifier le produit
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        dispatch(setId(row._id));
                        dispatch(setIsOpen(true));
                      }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <DeleteModal />
    </>
  );
}

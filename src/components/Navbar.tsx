import { Box, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <>
      <Box
        component="section"
        bgcolor="#E10714"
        textAlign="center"
        color="white"
        mb={5}
        p={2}
      >
        <Typography fontFamily={"sans-serif"}>Les bons Artisans</Typography>
      </Box>
    </>
  );
};

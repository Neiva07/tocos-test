import { AppBar, Toolbar, Button } from "@mui/material"
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate("users")}> Users </Button>
          <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate("transactions")}> Transactions </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

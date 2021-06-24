import React, { useEffect, useState } from "react";
import { Button, Box } from "@material-ui/core";
import axios from "axios";

import "./app.css";

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    select();
  }, []);

  useEffect(() => {
    if (!clicked) return;

    select();
    setClicked(false);
  }, [clicked]);

  function select() {
    axios
      .get("/select")
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else setRegistros(response.data.rows);
      })
      .catch((error) => alert(error.message));
  }

  function handleClick(nro) {
    axios
      .get(`/insert/${nro}`)
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else setClicked(true);
      })
      .catch((error) => alert(error.message));
  }

  const lista = registros.map((registro) => (
    <Box mx={1} key={registro.nro}>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => handleClick(registro.nro)}
      >
        {registro.nro}: {registro.quant}
      </Button>
    </Box>
  ));

  return <div className="bar">{lista}</div>;
}

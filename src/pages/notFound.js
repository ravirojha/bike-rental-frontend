import React from 'react';
import Container from "@mui/material/Container";

function NotFound(props) {
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20%"}}>
            <h1>Not Found</h1>
        </Container>
    );
}

export default NotFound;
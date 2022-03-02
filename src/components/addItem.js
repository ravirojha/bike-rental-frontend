import React from 'react';
import AddIcon from "@mui/icons-material/Add";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function AddItem({item = "item", isNew, change}) {
    return (
        <Box sx={{display: "flex",position: "absolute", zIndex: "100", left: "80%",top: "2%"}}>
            <Button onClick={() => change('new', !isNew)} variant="contained" startIcon={<AddIcon />} sx={{fontWeight: "500", backgroundColor: `white`, color: "black"}}>
                Add {item}
            </Button>
        </Box>
    );
}

export default AddItem;
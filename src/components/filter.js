import React, {useContext, useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {orangeColor} from "../utils";



function Filter({page, changeBike, filterData}) {

    const [filter, setFilter] = useState(filterData);
    const [value, setValue] = useState([null, null]);

    useEffect(() => {
        setFilter(filterData);
    },[filterData])

    function handleFilter(e) {
        e.preventDefault();
        const flter = {...filter};
        flter.startDate = value[0];
        flter.endDate = value[1];
        changeBike('filter', flter);
    }

    function valuetext(value) {
        return `${value}°C`;
    }


    return (
        <Container sx={{
            position: "fixed",
            top: "11%",
            left: "0",
            height: "90vh",
            width: "20rem",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
        }}>
            <Box component="form" onSubmit={handleFilter} noValidate
                 sx={{display: "flex", flexDirection: "column", padding: "15px",}}>
                <h3>Filter</h3>
                <TextField
                    margin="normal"
                    id="model"
                    label="Model"
                    name="model"
                    value={filter.value}
                    onChange={(e) => setFilter({...filter, model: e.target.value})}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    name="color"
                    label="color"
                    value={filter.color}
                    onChange={(e) => setFilter({...filter, color: e.target.value})}
                    id="color"
                />
                <TextField
                    margin="normal"
                    name="location"
                    label="location"
                    value={filter.location}
                    onChange={(e) => setFilter({...filter, location: e.target.value})}
                    id="location"
                    sx={{}}
                />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    paddingTop: "12px",
                    color: "#6d6d6d"
                }}>
                    <Typography>Rating</Typography>
                    <Slider
                        aria-label="Rating"
                        defaultValue={0}
                        onChange={(e) => setFilter({...filter, rating: e.target.value})}
                        value={filter.rating}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={5}
                        sx={{color: `${orangeColor}`}}

                    />
                </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="From"
                        endText="To"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} sx={{margin: "2px"}}/>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, backgroundColor: `${orangeColor}`, fontWeight: "600", }}
                    onClick={(e) => handleFilter}
                >
                    Filter
                </Button>
            </Box>
        </Container>

    );
}

export default Filter;


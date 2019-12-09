import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./lib/Copyright";
import Download from "./Download";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function Convert() {
    const classes = useStyles();
    const [name, setName] = useState();
    const [audio, setAudio] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(audio);
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CloudUploadIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Convert
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        autoFocus
                    />
                    <Button variant="contained" component="label">
                        Upload File
                        <input
                            name="audio"
                            type="file"
                            onChange={e => {
                                setAudio(e.target.files[0]);
                            }}
                            style={{ display: "none" }}
                        />
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Convert
                    </Button>
                    <Grid container></Grid>
                </form>
            </div>
            <Download />
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

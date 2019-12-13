import React, { useState, useEffect } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center"
    },

    wrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },

    buttonProgress: {
        color: orange[900],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },
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
    const [loading, setLoading] = React.useState(false);
    let [rows, setRows] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        let token = localStorage.getItem("converter_token");
        if (token !== undefined) {
            var formData = new FormData();
            formData.append("name", name);
            formData.append("audio", audio);
            setLoading(true);
            axios
                .post("/api/convert/index", formData, {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    setRows([response.data.data, ...rows]);
                })
                .catch(function(error) {
                    alert(JSON.stringify(error.message));
                    setRows([response.data.data]);
                })
                .finally(function() {
                    setLoading(false);
                });
        } else {
        }
    };

    useEffect(() => {
        //Get user information
        let token = localStorage.getItem("converter_token");
        if (token !== undefined) {
            axios
                .get("/api/convert/list", {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    setRows(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        } else {
        }
    }, []);

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
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Convert
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={30}
                                className={classes.buttonProgress}
                            />
                        )}
                    </div>
                    <Grid></Grid>
                </form>
            </div>
            <Download rows={rows} />
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

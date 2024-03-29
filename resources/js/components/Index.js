import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Convert from "./Convert";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    hidden: {
        visibility: "hidden"
    }
}));

export default function Index() {
    const classes = useStyles();

    const [page, setPage] = useState();
    const [logged, setLogged] = useState();

    const HeaderLinks = () => {
        if (logged) {
            return <Button color="inherit">Logout</Button>;
        } else {
            return (
                <>
                    <Button color="inherit" onClick={e => setPage(1)}>
                        Register
                    </Button>
                    <Button color="inherit" onClick={e => setPage(2)}>
                        Login
                    </Button>
                </>
            );
        }
    };

    const Page = () => {
        if (page == 1) {
            return (
                <SignUp
                    onChange={p => {
                        setPage(p);
                        //
                    }}
                />
            );
        } else if (page == 2) {
            return (
                <SignIn
                    onChange={p => {
                        setPage(p);
                        //If p == 0 mean, login success
                        if (p == 0) {
                            setLogged(true);
                        }
                    }}
                />
            );
        } else {
            return <Convert />;
        }
    };
    useEffect(() => {
        //Get user information
        let token = localStorage.getItem("converter_token");
        if (token != undefined) {
            axios
                .get("/api/auth/user", {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    // handle success
                    setLogged(true);
                    setPage(0);
                })
                .catch(function(error) {});
        } else {
            setLogged(false);
            setPage(2);
        }
    }, []);
    return (
        <div className={classes.root}>
            <div className="container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Audio Converter
                        </Typography>
                        <HeaderLinks />
                    </Toolbar>
                </AppBar>
                <Page />
            </div>
        </div>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}

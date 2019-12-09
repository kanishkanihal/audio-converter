import React, { Component, useState } from "react";
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

    const [page, setPage] = useState(1);
    const [logged, setLogged] = useState(false);

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
            return <SignUp />;
        } else if (page == 2) {
            return <SignIn />;
        } else {
            return <Convert />;
        }
    };

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

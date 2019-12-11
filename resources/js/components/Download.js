import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from '@material-ui/core/Link';

export default function Download(props) {
    let rows = props.rows;
    let token = localStorage.getItem("converter_token");

    let listen = (row) => {
        axios
            .get("/api/convert/download", {
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function(response) {
                const url = window.URL.createObjectURL(new Blob([response.data],{type : 'audio/mpeg'}));
                debugger;
                const link = document.createElement('audio');
                link.href = url;
                link.setAttribute('src', 'ujm.mp3'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch(function(error) {
                console.log(error)
            });
    }
    return (
        <Paper>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Original</TableCell>
                        <TableCell>Converted</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.user_id}>
                            <TableCell>{row.original_name}</TableCell>
                            <TableCell>
                                <Link
                                    to
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        listen(row)
                                    }}
                                >
                                    {row.download_name}
                                </Link>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

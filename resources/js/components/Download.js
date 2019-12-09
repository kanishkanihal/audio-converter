import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function createData(id, original, converted) {
    return { id, original, converted };
}

const rows = [
    createData(0, "Frozen yoghurt", 159),
    createData(1, "Ice cream sandwich", 233),
    createData(2, "Eclair", 262),
    createData(3, "Cupcake", 305),
    createData(4, "Gingerbread", 356)
];

export default function Download() {
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
                        <TableRow key={row.id}>
                            <TableCell>{row.original}</TableCell>
                            <TableCell>{row.converted}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

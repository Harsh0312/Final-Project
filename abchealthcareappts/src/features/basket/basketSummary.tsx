import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";

export  default function BasketSummary(){
    const{basket}=useStoreContext();
    const total = basket?.items.reduce((sum,item)=>sum + (item.quantity*item.priceMed),0);
        return(
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell  colSpan={2}>Total</TableCell>
                            <TableCell align='right'>{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
}
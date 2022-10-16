import { Delete, Remove, Add } from "@mui/icons-material";
import {  Box, Button, Grid, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./basketSummary";


export default function BasketPage()
{
    const{basket,setBasket,removeItem} =useStoreContext();
    const[loading,setLoading]=useState(false);

    function handleAddItem(medicineId:number){
        setLoading(true);
        agent.Basket.addItem(medicineId)
        .then(basket => setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))

    }
    function handleRemoveItem(medicineId:number,quantity=1){
        setLoading(true);
        agent.Basket.removeItem(medicineId,quantity)
        .then(()=>removeItem(medicineId,quantity))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))

    }

    if(!basket) return <Typography variant='h3'>Your Basket is Empty</Typography>
    return(
        <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Medicine </TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(item => (
            <TableRow
              key={item.idMed}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                    <img src={item.imagePathMed} alt={item.nameMed} style={{height:50,marginRight:20}}/>
                    <span>{item.nameMed}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{item.priceMed}</TableCell>
              <TableCell align="center">
                {/* <LoadingButton loading={loading} onClick={()=>handleRemoveItem(item.idMed,item.quantity)} color="error">
                    <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={loading} onClick={()=> handleAddItem(item.idMed)} color="secondary">
                    <Add/>
                </LoadingButton> */}
                <IconButton color="error" onClick={()=>handleRemoveItem(item.idMed,item.quantity)}>
                    <Remove/>
                </IconButton>
                {item.quantity}
                <IconButton color="secondary" onClick={()=> handleAddItem(item.idMed)}>
                    <Add/>
                </IconButton>
                </TableCell>
              <TableCell align="right">{item.priceMed * item.quantity}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <IconButton color='error' onClick={() =>handleRemoveItem(item.idMed, item.quantity)}>
                <Delete/>
              </IconButton>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
            <Grid item xs={6}/>
            <Grid item xs={6}>
            <BasketSummary/>
            <Button component={Link} href='\checkout'  variant='contained' size="large" fullWidth>
              Checkout
            </Button>

            </Grid>     
    </Grid>

        </>
        
        
    )
}
import { LoadingButton } from '@mui/lab';
import {Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import { Medicine } from '../../app/models/medicine';

export default function MedicineDetails(){
    const { basket,setBasket,removeItem}=useStoreContext();
    const{idMed}=useParams<{idMed:string}>();
    //const[medicine,setMedicine] = useState<Medicine | null>(null);
    const[medicine,setMedicine]=useState<Medicine | null>(null);
    const[loading,setLoading] = useState(true);
    const[quantity,setQuantity]= useState(0);
    const[submitting,setSubmitting]=useState(false);
    const item= basket?.items.find( i=>i.idMed==medicine?.idMed)

    useEffect(()=>{
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(parseInt(idMed!))
        .then(response=>setMedicine(response))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
    },[idMed,item])

    function handleInputChange(event:any){
        if (event.target.value>=0){
            setQuantity(parseInt(event.target.value));
            
        }
    }
    function handleUpdatCart(){
        setSubmitting(true) ;
            if(!item || quantity>item.quantity){
                const updatedQuantity=item? quantity- item.quantity:quantity;
                agent.Basket.addItem(medicine?.idMed!,updatedQuantity)
                .then(basket=>setBasket(basket))
                .catch(error=>console.log(error))
                .finally(()=>setSubmitting(false))
            }else{
                const updatedQuantity=item.quantity-quantity;
                agent.Basket.removeItem(medicine?.idMed!,updatedQuantity)
                .then(()=>removeItem(medicine?.idMed!,updatedQuantity))
                .catch(error=>console.log(error))
                .finally(()=>setSubmitting(false))
            }
        }
     

    if(loading) return <h3>Loading.....</h3>


    if(!medicine) return <h3>Not Found</h3>


    return(
        <>
           <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src='http://picsum.photos/200' alt={medicine.nameMed} style={{width:'100%'}}/>
            </Grid>
           <Grid item xs={6}>
            <Typography variant='h3'>{medicine.nameMed}</Typography>
            <Divider sx={{mb: 2}}/>
            <Typography variant='h4' color='secondary'>&#8377; &nbsp;{medicine.priceMed}</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{medicine.nameMed}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Medicine Description</TableCell>
                            <TableCell>{medicine.descriptionMed}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>{medicine.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Seller of the Medicine</TableCell>
                            <TableCell>{medicine.sellerMed}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity</TableCell>
                            <TableCell>{medicine.quantity}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField variant='outlined' type='number' label='Quantity in Cart' 
                    fullWidth value={quantity} onChange={handleInputChange}
                    >     
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton disabled={item?.quantity===quantity || !item && quantity===0} loading={submitting} onClick={handleUpdatCart} sx={{height:'55px' }}color='primary' variant='contained' size='large' fullWidth>
                        {item? 'Update Quantity' : 'Add to Cart'}
                    </LoadingButton>
                </Grid>
            </Grid>
           </Grid>
           </Grid>
        </>
               
    );
    }
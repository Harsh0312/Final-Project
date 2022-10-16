import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Medicine } from "../../app/models/medicine";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../app/context/StoreContext";

interface props{
    medicine: Medicine;
}
export default function MedicineCard({medicine}:props){
  const[loading,setLoading]=useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(medicineId:number){
    setLoading(true);
    agent.Basket.addItem(medicineId)
    .then(basket => setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
  }
    return(
        <>
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader sx={{}}
            avatar={
                <Avatar sx={{bgcolor:'secondary.main'}}>
                    {medicine.nameMed.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={medicine.nameMed}
            titleTypographyProps={{
                sx:{fontWeight:'bold',color:'primary.main'}
            }}
            />
      <CardMedia
        component="img"
        sx={{height:"140",
        backgroundSize:'contain',bgcolor:'primary.light'}}
        image={medicine.imagePathMed}
        title={medicine.nameMed}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        &#8377; &nbsp;{medicine.priceMed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {medicine.category}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton size="small" loading={loading} onClick={()=> handleAddItem(medicine.idMed)}>
        Add to Cart</LoadingButton>
        <Button component ={Link} to={`/catalog/${medicine.idMed}`} size="small">View</Button>
      </CardActions>
    </Card>
        </>
    )
}
import {List,ListItem,ListItemAvatar,Avatar,ListItemText, Grid} from '@mui/material';
import {Medicine}  from '../../app/models/medicine'
import MedicineCard from './MedicineCard';

interface props{
    medicines:Medicine[];
} 

export default function MedicineList({medicines}:props){
    return(
        
       <Grid container spacing={4}>
        {medicines.map(medicine => (
            <Grid item xs={3}>
            <MedicineCard key={medicine.idMed} medicine={medicine}/>
            </Grid>
        ))}

       </Grid>
        
    )
}
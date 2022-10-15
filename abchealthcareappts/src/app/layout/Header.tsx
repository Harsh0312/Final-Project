import { ShoppingCart } from '@mui/icons-material';
import {AppBar,Badge,Box,FormControlLabel,IconButton,List,ListItem,Switch,Toolbar,Typography} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';
 
interface Props{
    darkMode:boolean;
    handleThemeChange:()=>void;
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about'  , path: '/about'},
    {title: 'contact' ,path: '/contact'}
]
const RighLinks=[
    {title:'login',path:'/login'},
    {title:'register',path:'/register'}
]

const NavStyle ={
    color:'inherit',
    textDecoration : 'None',
    typography:'h6',
    '&:hover':{
        color:'grey.500'
    },
    '&.active':{
        color:'text.secondary'
    }
}
export default function Header({darkMode,handleThemeChange}:Props){
const{basket}= useStoreContext();
const itemCount= basket?.items.reduce((sum,item)=> sum + item.quantity,0)


    return(
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Box sx={{display:'flex' ,alignItems:'center'}}>
            <Typography variant='h6' component={NavLink} to='/' sx={NavStyle}>
                    Re-store
                </Typography>
                <Switch onChange={handleThemeChange} checked={darkMode}></Switch>
            </Box>
                
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title,path})=>
                    <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx = {NavStyle}
                >   
                        {title.toUpperCase()}
                    </ListItem>
                    )}
                </List>
                <Box sx={{display:'flex',alignItems:'center'}}>
                
                <IconButton component={Link} to='/basket' size='large' sx={{color:'inherit'}}>
                    <Badge badgeContent={itemCount} color='secondary'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                <List sx={{display:'flex'}}>
                    {RighLinks.map(({title,path})=>
                    <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx = {NavStyle}
                >   
                        {title.toUpperCase()}
                    </ListItem>
                    )}
                </List>
                </Box>
            </Toolbar>
        </AppBar>
    )

}
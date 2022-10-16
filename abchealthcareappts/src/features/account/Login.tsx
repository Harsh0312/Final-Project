import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useState } from 'react';
import { SupportAgentSharp } from '@mui/icons-material';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';



const theme = createTheme();

export default function Login() {
    const{register,handleSubmit,formState:{isSubmitting,errors,isValid}}=useForm()

    async function submitForm(data:FieldValues){
        try{
        await agent.Account.login(data);
        }
        catch(error){
            console.log(error)

        }
    }
  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth="sm" sx={{display:'flex',flexDirection:'column',alignItems:'center',p:4}}>
        <CssBaseline />
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              {...register('username',{required:'Username is required'})}
              error={!!errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password',{required:'Password is required'})}
              error={!!errors.password}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
           
              <Grid item>
                <Link to='/register' >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Container>
    </ThemeProvider>
  );
}
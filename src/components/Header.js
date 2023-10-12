//import react and components from mui
import React from 'react';
import { Typography, Box } from '@mui/material';

//header component
const Header = () => {
    return (
        //box with sx styling
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5
        }}>
            {/*Title with typography component */}
            <Typography variant='h1' style={{fontFamily: 'Onest'}}>Hangman</Typography>
        </Box>
    )   
}

export default Header;
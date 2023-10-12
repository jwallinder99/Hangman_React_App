//import react and mui components
import React from 'react'
import { Box, Paper, Typography } from "@mui/material"

//chancesLeft component with fails prop as argument
const ChancesLeft = fails => {
    //contents of box are 10(number of chances) - length of fails state passed as a prop
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Paper>
            <Typography variant='h4' sx={{padding: '10px'}}>
                Attempts left: {10 - fails.fails.length}
            </Typography>
        </Paper>
        </Box>
    )
    
}

export default ChancesLeft;
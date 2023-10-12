//import react and mui components
import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

//gameEndPopUp component
//takes status, word and reset props as arguments
const GameEndPopUp = ({ status, word, reset }) => {
    //if status prop is empty(meaning game hasn't started or is ongoing), don't return the component
    if(!status){
        return
    }
    //else return the component
    //backgroundColor sx is determined by status prop, if "lost", then red, if 'WOn' then green
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50vw',
            height: '30vh',
            transform: 'translate(-50%, -50%)',
            backgroundColor: `rgba(${status === 'Lost' ? 255 : 0}, ${status === 'Won' ? 255 : 0}, 0, 0.2)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            {/* Typography component displays props and reset button onclick calls reset function which is passed as a prop from parent component*/}
            <Typography sx={{opacity: '1.0', fontSize: '2rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: "white"}}>
                <Stack>
                You {status}!
                The word was {word}
                <Button onClick={reset} size="large" sx={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} color="success">Reset?</Button>
                </Stack>
            </Typography>
        </Box>
    )
}

export default GameEndPopUp;
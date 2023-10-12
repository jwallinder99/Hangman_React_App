//import react, paper and typography components 
import React from 'react'
import Paper from '@mui/material/Paper'
import { Typography, Button } from '@mui/material'

//letterInput component that takes char and color props as arguments
const LetterInput = ({ char, color }) => {
    //key of paper is set to char prop
    //paper has sx stylinh and contents of paper are set to char prop
    return (
        <Paper key={char} sx={{
            py: '2px',
            margin: '10px',
            paddingX: '10px',
            fontSize: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        {/*color of typography component is determind by color prop, which is either default or red depending on the condition in the parent component */}
        <Typography sx={{color: {color}, fontSize: "2rem"}}>{char}</Typography>    
        </Paper>
    )
}

export default LetterInput;


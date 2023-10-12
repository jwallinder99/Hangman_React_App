import React from 'react';
import Box from '@mui/material/Box'

//import state imgs
import state1Img from '../images/state1.GIF'
import state2Img from '../images/state2.GIF'
import state3Img from '../images/state3.GIF'
import state4Img from '../images/state4.GIF'
import state5Img from '../images/state5.GIF'
import state6Img from '../images/state6.GIF'
import state7Img from '../images/state7.GIF'
import state8Img from '../images/state8.GIF'
import state9Img from '../images/state9.GIF'
import state10Img from '../images/state10.GIF'
import state11Img from '../images/state11.GIF'

//array for the images
const stateImgs = [];
//push images into array
stateImgs.push(state1Img, state2Img, state3Img, state4Img, state5Img, state6Img, state7Img, state8Img, state9Img, state10Img, state11Img )


//return hangman component that takes the amount of fails as a prop
const HangMan = fails => {
    //img element's source will be the array of images, and the index of the array is the value passed from the amount of fails
    return (
        <Box sx={{mt: 10}}>
            <img src={stateImgs[fails.fails.length]} style={{width: '300px', height: 'auto', marginBottom: '50px'}} />
        </Box>
    )
}

export default HangMan;
//import useState and useEffect from react
import { useState, useEffect } from 'react';
import React from 'react';
//import components
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Typography, Stack, Button } from '@mui/material';
import LetterInput from './LetterInput'
import ChancesLeft from './ChancesLeft'
import Hangman from './HangMan'
import GameEndPopUp from './GameEndPopUp'

//game component is parent of other components of the game. 
const Game = () => {
    //state for saving current word to guess
    const [word, setWord] = useState('');
    //state for saving amount of correct letters - this is used to validate wether the player won or lost
    const [corrects, setCorrects] = useState([])
    //state for saving amount of fails - this is used to validate wether the player won or lost
    const [fails, setFails] = useState([])
    //state for status of game (has player lost or not) - this is used for when the end of the game happens, and the popup needs to decide if the player won or lost
    const [status, setStatus] = useState('')

    //async function to fetch a random word from an api
    const fetchWord = async () => {
        //try catch blocks incase of bad status
        try {
            //fetch response object from api (random word)
            const response = await fetch('https://random-word-api.herokuapp.com/word')
            //if status of response is not okay
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            //await response of api call and turn it into a json object
            const fetchedData = await response.json()
            //set word to the fetched word in uppercase
            setWord(fetchedData[0].toUpperCase())
            console.log(fetchedData[0])
            //throw error if error occures from bad status
        }catch(error){
            console.error("Error fetched data: ", error)
        }
    }

    //function to handle when a letter is guessed/ clicked on
    const handleGuess = letter => {

        //if letter is included in the word state
        if(word.includes(letter)){
            //set corrects state
            //state is set as an array with two items, the first item is the current corrects state array that has been spread with the spread operator, 
            //and the second item is the letter being guessed. This pushes a new array of the current correct letters + the current letter that was guessed
            setCorrects([...corrects, letter])

            //if letter is not included in word
            //set the letter to the 'fails' state
        } else {
            setFails([...fails, letter])  
        }
        
    }

    //use effect hooks dependant on corrects and fails. Whenever corrects or fails is updated, the useEffect hook will execute
    //each time either state is updated, the useEffects evaluate if the player has won or lost yet
    useEffect(()=>{
        //if corrects state has length and every letter in the corrects state is included in the word state
        if(corrects.length && word.split('').every(letter => corrects.includes(letter))){
            //set the status state to "Won"
            setStatus("Won")
            console.log("You Won")
        }
    }, [corrects])

    useEffect(()=>{
        //if length of fails is 10 set status state to Lost
        if(fails.length === 10){
            setStatus("Lost")
            console.log("You lost")
        }
    }, [fails])

    //function to handle reset button
    const reset = () => {
        //reset corrects state
        setCorrects([])
        //reset fails state
        setFails([])
        //reset status state
        setStatus('')
        //fetch word again 
        fetchWord()
    }
    
    //variable that holds the alphabet used to display input to user
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    

    //Mui box components with sx styling and Stack components for arranging components
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}> 
            <Stack spacing={2}>
                {/*Check if word state exists, if it does render word to guess */}
            {word? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    }}>
                        {/*MAP HIDDEN WORD
                            split uppercase word state and map each letter to a paper component. Check if corrects state array includes letter, if it does, render letter, else render _ */}
                {word.toUpperCase().split('').map(letter => corrects.includes(letter) ? letter : '_').join('').split('').map((char, index) =>{
                    //each letter or _ is mapped to the contents of a paper component from mui
                  return(
                      <Paper 
                        key={index} 
                        sx={{display: 'inline-block', 
                             margin: '4px', 
                             paddingX: '10px',
                             paddingY: '0px' 
                             }}
                             >
                            <Typography sx={{fontSize: '65px'}}>{char}</Typography>
                        </Paper>
                  )
                })}
                </Box>
                //if the word state doesn't exist then don't render the above
            ): null}
            {/* if word state exists render 'chancesLeft' component with fails state passed as props */}
            {word?(
                <ChancesLeft fails={fails} />
            ): null}
            
                {/*If word does not exist, render play button */}
            {!word?(
                <Box sx={{
                    position: 'aboslute',
                    width: '50vw',
                    height: '30vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                    <Button onClick={fetchWord} variant="contained" size="large" sx={{padding: '15px'}}>PLAY</Button>
                </Box>
                //if word exists, don't render the above
            ): null}
            
              
            <Stack direction="row">
                {/*if word exists render a box component with the hangman component, and another box displaying the letters variable as inputs */}
            {word?(
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    }}>
                <Hangman fails={fails} />
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    float: 'right',
                    flexDirection: 'row',
                    marginLeft: '50px'
                    }}>
                        {/*split the uppercase letters variable and map each letter to a button component with a letter component */}
                    {letters.toUpperCase().split('').map((letter, index) =>{
                        {/*Button will call handleGuess function and pass the letter prop as an argument
                        disabled set to true once the letter is included in either fails state or corrects state */}
                        return(
                            <Button 
                            onClick={() => handleGuess(letter)}
                            disabled={corrects.includes(letter) || fails.includes(letter)}
                            key={index}
                            >{/*letterInput component put here as the contents of the button component. The color prop is red if the letter has been included in either fails or corrects state */}
                                <LetterInput char={letter} color={corrects.includes(letter) || fails.includes(letter) ? 'red' : ''} key={index}/>
                            </Button>
                        )
                    })}
                </Box>
            </Box>
            //if word state doesn't exist don't render the above
            ): null}
                {/*GameEndPopUp is placed here and passed status state, word state, and reset state to determine what it should display */}
            <GameEndPopUp status={status} word={word} reset={reset} />
            </Stack>
            </Stack>

            
        </Box>
    )   
    
}

export default Game; 
import { useState } from 'react'
import './App.css'
import pads from "./pads"
import click from "./assets/click.mp3"

function App() {
  const [secDisplay, setSecDisplay] = useState("0")
  const [display, setDisplay] = useState("0")
  const [mute, setMute] = useState(false)
  let result
  
  const displayPads = pads.map(pad => <div className='pad' id={pad.id} key={pad.id} onClick={() => handleClick(pad.value)}>{pad.display}</div>)

  function handleClick(value) {
    const audio = new Audio(click)
    !mute && audio.play()
    if(value === "clr"){
      handleClear()
    } else if(value === "="){
      handleEquals()
    } else if(value === "/" || value === "*" || value === "+" || value === "-"){
      handleOperator(value)
    } else if(value === "."){
      handleDecimal()
    } else if(!isNaN(value)){
      handleNumber(value)
      
    }
  }

  function handleClear() {
    setDisplay("0")
    setSecDisplay("")
  }

  function handleEquals(){
    if(!secDisplay.includes('=')){
      result = eval(secDisplay).toString()
      setSecDisplay(prevDisplay => prevDisplay + "= " + result)
      setDisplay(result)
    }
  }
  
  function handleOperator (value){
    if(secDisplay.includes('=')){
      setSecDisplay(display + value)
      setDisplay(value)
    } else if(secDisplay === "+" || secDisplay === "-" || secDisplay === "*" || secDisplay === "/"){
      setSecDisplay(value)
      setDisplay(value)
    }else if(!isNaN(secDisplay.slice(-1))){ 
      setSecDisplay(prevDisplay => prevDisplay + value)
      setDisplay(value)  
    }else if(((secDisplay.slice(-2) === "+-") || (secDisplay.slice(-2) === "*-") || (secDisplay.slice(-2) === "/-") || (secDisplay.slice(-2) === "--")) && (value !== "-")){
      setSecDisplay(prevDisplay => prevDisplay.slice(0, -2) + value)
      setDisplay(value)
    }else if((secDisplay.slice(-2) === "--") && (value === "-")){

    }else if(((secDisplay.slice(-1) === "+") || (secDisplay.slice(-1) === "*") || (secDisplay.slice(-1) === "/")) && (value === "-")){
      setSecDisplay(prevDisplay => prevDisplay + value)
      setDisplay(value)  
    }else if((secDisplay.slice(-1) === "-") && (value !== "-")){
      setSecDisplay(prevDisplay => prevDisplay.slice(0, -1) + value)
      setDisplay(value)
    }else if((secDisplay.slice(-1) === "-") && (value === "-")){
      setSecDisplay(prevDisplay => prevDisplay + value)
      setDisplay(value) 
    }else if(((secDisplay.slice(-1) === "+") || (secDisplay.slice(-1) === "*") || (secDisplay.slice(-1) === "/")) && (value !== "-")){
      setSecDisplay(prevDisplay => prevDisplay.slice(0, -1) + value)
      setDisplay(value)
    }
  }

  function handleDecimal(){
    if(secDisplay.includes('=')){
      setSecDisplay(".")
      setDisplay(".")
    } else if(!/\./.test(display)){
      setDisplay(prevDisplay => prevDisplay + ".")
      setSecDisplay(prevDisplay => prevDisplay + ".")
    }
  }

  function handleNumber(value){
    if(secDisplay.includes('=')){
      setSecDisplay(value)
      setDisplay(value)
    } else if(value !== "0" && display === "0"){
      setDisplay(value)
      setSecDisplay(value)
    } else if(display !== "0" && !isNaN(display)){
      setDisplay(prevDisplay => prevDisplay + value)
      setSecDisplay(prevDisplay => prevDisplay + value)  
    } else if(isNaN(display)){
      setDisplay(value)
      setSecDisplay(prevDisplay => prevDisplay + value)  
    }
  }

  function toggleMute(){
    setMute(prevState => !prevState)
  }

  const muteButton = mute ? 
                    <div className="material-symbols-outlined"onClick={toggleMute}>volume_off</div> : 
                    <div className="material-symbols-outlined"onClick={toggleMute}>volume_up</div>

  return (
    <>
      <div className='container'>
        <div className='display' id="display-sec">{secDisplay}</div>
        <div className='display' id='display'>{display}</div>
        {displayPads}
      </div>
      <div className='footer'>
        {muteButton}
        <p className='footer-text'>This is part of the <a href='https://www.freecodecamp.org/' target="_blank">FreeCodeCamp</a> frontend certification.</p>
      </div>
    </>
  )
}

export default App

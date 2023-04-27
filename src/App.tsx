import React from 'react'
import './App.css'
import {Howl} from 'howler';
import click from './click.mp3'
import quote_img from './assets/quotes.svg'









const App = () => {
  const [quote, setQuote] = React.useState('')
  const [loader, setLoader] = React.useState(false)
  var sound = new Howl({
    src: [click],
    autoplay: true,
    volume: 1,
    onend: function() {
      console.log('Finished!');
    }
  });





  function generate(){
    sound.play();
    setLoader(true)
    fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => {
      setQuote(data.content)
      setLoader(false)
    })
    .catch(err => {
      console.log(err)
      setLoader(false)
    })}

  


  React.useEffect(() => {
    setLoader(true)
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data.content)
        setLoader(false)
      })
  },[])

  return (
    <div className="container">
      <div className="quote_icon">
        <img src={quote_img} alt="quotes" />
      </div>
      <div className="main_content">
        <span>{loader ? 'Loading...' : quote}</span>
        <button className="generate_btn" onClick={generate}>Generate</button>
      </div>
    </div>
  )
}

export default App
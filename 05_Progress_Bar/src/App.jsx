import { useEffect, useState } from 'react'
import './App.css'


function ProgressBar({progress}){
  const [animatedProgress, setAnimatedProgress] = useState(0)
  useEffect(()=>{
    setTimeout(()=> setAnimatedProgress(progress), 300)
  },[progress])
  return (
    <div className='outer'>
      <div className='inner' style={
        {
          // width: `${animatedProgress}%`,
          transform : `translateX(${animatedProgress - 100}%)`,
          color : `${progress < 3 ? 'black' : 'white'}`
        }}
        role='progressbar'
        aria-valuenow={animatedProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        >{progress}%</div>
    </div>
  )
}


function App() {
  const progressArr = [0,3, 5, 30, 50, 70, 100]

  return (
    <>
      <h1 className='heading'>Progress Bar</h1>
      {
        progressArr.map(progress => (
          <ProgressBar progress={progress}/>
        ))
      }
    </>
  )
}

export default App

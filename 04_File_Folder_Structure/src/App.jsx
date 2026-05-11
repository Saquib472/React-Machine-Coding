import { useState } from 'react'
import './App.css'
import json from "./data.json"
import List from './components/List'

function App() {
  const [data, setData] = useState(json)
  return (
    <div className='main'>
      <h1>File/Folder Structure</h1>
      <List list={data} setData={setData}/>
    </div>
  )
}

export default App

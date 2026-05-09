const Settings = ({data,setData}) => {
  const {theme} = data
  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      theme : e.target.name
    }))
  }
  return (
    <div>
      <label>
        <input type="radio" name="light" checked={theme === 'light' ? true : false} onChange={(e)=>handleChange(e)} />
        Light
      </label>
      <label>
        <input type="radio" name="dark" checked={theme === 'dark' ? true : false} onChange={(e)=>handleChange(e)} />
        Dark
      </label>
    </div>
  )
}

export default Settings
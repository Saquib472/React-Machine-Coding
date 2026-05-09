const Profile = ({data,setData,errors}) => {
  const {name,age,email} = data
  function handleChange(e){
    setData((prevData)=>({
      ...prevData,
      [e.target.name] : e.target.value
    }))
  }

  return (
    <div className="profile-form">
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e)=>handleChange(e)}/> 
        {errors.name && <small className="error">{errors.name}</small>}
      </div>
      <div>
        <label className="profile-label-age">Age:</label>
        <input type="number" name="age" value={age} onChange={(e)=>handleChange(e)}/>
        {errors.age && <small className="error">{errors.age}</small>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e)=>handleChange(e)}/>
        {errors.email && <small className="error">{errors.email}</small>}
      </div>
    </div>
  )
}

export default Profile
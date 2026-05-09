const Interests = ({ data, setData, errors }) => {
  const { interests } = data;
  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      interests: interests.includes(e.target.name)
        ? interests.filter((i) => i != e.target.name)
        : [...interests, e.target.name],
    }));
  };
  return (
    <div>
      <label>
        <input
          name="coding"
          type="checkbox"
          checked={interests.includes("coding") ? true : false}
          onChange={(e) => handleChange(e)}
        />
        Coding
      </label>
      <label>
        <input
          name="reading"
          type="checkbox"
          checked={interests.includes("reading") ? true : false}
          onChange={(e) => handleChange(e)}
        />
        Reading
      </label>
      <label>
        <input
          name="running"
          type="checkbox"
          checked={interests.includes("running") ? true : false}
          onChange={(e) => handleChange(e)}
        />
        Running
      </label>
      {errors.interests && <small className="error">{errors.interests}</small>}
    </div>
  );
};

export default Interests;

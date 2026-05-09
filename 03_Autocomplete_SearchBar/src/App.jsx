import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [focusedRes, setFocusedRes] = useState(0)
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({})
  const [result, setResult] = useState([]);

  const containerRef = useRef(null); //Create the ref

  // Handle scrolling when focusedRes changes
  useEffect(() => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      if (children[focusedRes]) {
        children[focusedRes].scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Only scrolls if item is hidden
        });
      }
    }
  }, [focusedRes]);

  // Handling the Arrow Up and Down Feature.
  useEffect(() => {
    if (!showResults) return;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setFocusedRes((prev) => (prev < result.length - 1 ? prev + 1 : prev));
        } else if (event.key === "ArrowUp") {
          setFocusedRes((prev) => (prev > 0 ? prev - 1 : 0));
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
  }, [showResults, result.length]);

  // Fetching Data with Optimization using Debouncing.
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!cache[input]){
          const data = await fetch(
            "https://dummyjson.com/recipes/search?q=" + input,
          );
          const json = await data.json();
          setCache((prev)=> ({...prev, [input] : json.recipes}))
          setResult(json?.recipes);

        }else{
          setResult(cache[input])
        }
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setTimeout(fetchData, 300)
    return ()=> {
      clearTimeout(timer)
    }
  }, [input, cache]);

  return (
    <>
      <h1 className="heading">Autocomplete Search Bar</h1>
      <div className="main">
        <input
          className="input-box"
          type="text"
          placeholder="Search your recipe"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => {
            setShowResults(false)
            setFocusedRes(0)
          }}
        />
        {showResults && (
          <div className="result-container" ref={containerRef}>
            {result.map((res, i) => (
              <span className={"result" + (i === focusedRes ? " focused" : "")} key={res.id}>
                {res.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import History from "../History";

const Search = (props) => {
    const [input, setInput] = useState('')
    const [searchHistory, setSearchHistory] = useState([])

    const handleClick = () => { 
        searchHistory.push(input)
        setSearchHistory([...searchHistory])
        props.searchCity(input)     
        setInput('') 
    }

    const handleKeyDown = (e) => {
        if( e.key === "Enter") {
            searchHistory.push(input)
            setSearchHistory([...searchHistory])
            props.searchCity(input)
            setInput('') 
        }
    }

    return(
        <div className="search-container">
            <div className="search-top">
                <input className="input" onKeyDown={e => handleKeyDown(e)} onChange={e => setInput(e.target.value)} type="text" value={input} placeholder="City name..."/>
                <button onClick={handleClick}>Search</button>
            </div>
            <History data={searchHistory}/>
        </div>
    )
}

export default Search;
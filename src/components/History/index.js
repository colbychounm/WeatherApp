import '../components.css';
import React, { useContext } from 'react';
import { Context } from '../Weather';

function History ({data}) {
    const callApi = useContext(Context)
    return (
        <div className="history-container">
            {
                data.map((item, index) => {
                    return <button onClick={() => callApi(item)} key={index}>{item}</button>
                })
            }
         </div>
    )
}

export default History;
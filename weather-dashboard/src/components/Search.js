import React, { useState } from 'react';
function Search({ setCity, units, setUnits}) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = () => {
        if (searchTerm.trim() !== ''){
            setCity(searchTerm.trim());
        }
    };
    return (
        <div className='search'>
            <input
            type="text"
            placeholder='Enter city name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick = {handleSearch}>Search</button>
            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={units === 'imperials'}
                    onChange={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}
                    />
    
                </label>

            </div>
        </div>
    );
}
export default Search;
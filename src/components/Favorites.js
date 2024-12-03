import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites({ setCity }) {
    const [favorites, setFavorites] = useState([]);

    // Fetch favorite cities when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/favorites')
            .then((response) => {
                console.log('Favorites fetched from API:', response.data);
                setFavorites(response.data);
            })
            .catch((error) => {
                console.error('Error fetching favorites:', error);
            });
    }, []);

    const addFavorite = (city) => {
        const trimmedCity = city?.trim(); // Ensure city is not null and trim whitespace
        if (!trimmedCity) {
            alert('City name cannot be empty!');
            return;
        }

        axios.post('http://localhost:5000/favorites', { name: trimmedCity })
            .then((response) => {
                setFavorites((prevFavorites) => [...prevFavorites, response.data]);
            })
            .catch((error) => {
                console.error('Error adding favorite:', error);
                alert('Failed to add favorite. Please try again.');
            });
    };

    const removeFavorite = (id) => {
        axios.delete(`http://localhost:5000/favorites/${id}`)
            .then(() => {
                setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
            })
            .catch((error) => {
                console.error('Error removing favorite:', error);
                alert('Failed to remove favorite. Please try again.');
            });
    };

    return (
        <div className="favorites">
            <h3>Favorite Cities</h3>
            {favorites.length === 0 ? (
                <p>No favorite cities yet. Add some!</p>
            ) : (
                <ul>
                    {favorites.map((fav) => (
                        <li key={fav.id}>
                            <span onClick={() => setCity(fav.name)}>{fav.name}</span>
                            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => {
                const city = prompt('Enter city name:');
                addFavorite(city);
            }}>Add Favorite</button>
        </div>
    );
}

export default Favorites;

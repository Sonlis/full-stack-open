import axios from 'axios';
import { useState, useEffect } from 'react';

const Countries = ({countries}) => {
    console.log(countries);
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (
            <>
                {countries.map(country => {
                    return <p key={country.ccn3}>{country.name.common}</p>
                })}
            </>
        )
    } else if (countries.length === 1) {
        const country = countries[0];
       /*
         country.languages.keys.map(key => {
            console.log(key);
        })
        */
        console.log(Object.keys(country.languages));

        return (
            <>
                <h2>{country.name.common}</h2>
                <p>Capital {country.capital[0]}</p>
                <p>Area {country.area}</p>
                <ul>
                    {Object.keys(country.languages).map(key =>
                        <li key={country.languages[key]}>{country.languages[key]}</li>
                    )}
                </ul>
                <p>{country.flag}</p>
            </>
        )
    }
}


const App = () => {
    const hook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }
    useEffect(hook, []);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const filterCountries = (event) => {
        const filter = event.target.value;
        const matchingCountries = [];
        countries.forEach(country => {
            if (country.name.common.includes(filter)) {
                matchingCountries.push(country);
            }
        })
        setFilteredCountries(matchingCountries);
    }
    return (
        <div>
            find countries <input onChange={filterCountries} />
            <Countries countries={filteredCountries} />
        </div>
    )
}

export default App;

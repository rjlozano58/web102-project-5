import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import BarInfo from './components/BarInfo'

function App() {
  const [count, setCount] = useState(0)

  const mainURL= "https://api.openbrewerydb.org/v1/breweries?per_page=200";
  const [allBars,setBars] = useState([]);
  const [totalBars,setTotalBars] = useState(0);
  const [searchBars,setSearchBars] = useState([]);
  const [barsWithWebsites, setBarsWithWebsites] = useState([]);
  const [barsWithPhoneNumbers, setBarsWithPhoneNumbers] = useState([]);
  const [search,setSearch] = useState("");
  const [popCity,setPopCity] = useState("");
  const [popState,setPopState] = useState("");


  useEffect(() => {
    async function fetchData() {

      try {
        const res = await axios.get(mainURL);
        const data = res.data;
        setBars(data);
        setTotalBars(data.length);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }

    }
    
    fetchData();
  }, []);

  const updateSearch = (event) =>{
    setSearch(event.target.value);
    console.log("new search: " + search);
  }

  function searchByName(){
    const newBars = allBars.filter(bar => bar.name.toLowerCase().includes(search.toLowerCase()) );
    const barsWithWebsite = newBars.filter(bar => bar.website_url);
    const barsWithPhoneNumber = newBars.filter(bar => bar.phone);

    setSearchBars(newBars);
    calculateMostPopularCity(newBars);
    calculateMostPopularState(newBars);
    setBarsWithWebsites(barsWithWebsite);
    setBarsWithPhoneNumbers(barsWithPhoneNumber);

  }

  function calculateMostPopularCity(breweries) {
    // Create an object to store the count of each city
    const cityCounts = {};
  
    // Iterate through the breweries array and count occurrences of each city
    breweries.forEach(brewery => {
      const city = brewery.city;
      if (cityCounts[city]) {
        cityCounts[city]++;
      } else {
        cityCounts[city] = 1;
      }
    });
  
    // Find the city with the highest count
    let mostPopularCity = '';
    let maxCount = 0;
  
    for (const city in cityCounts) {
      if (cityCounts[city] > maxCount) {
        mostPopularCity = city;
        maxCount = cityCounts[city];
      }
    }

    console.log(maxCount);
    console.log(mostPopularCity);
  
    setPopCity(mostPopularCity);
  }

  function calculateMostPopularState(breweries) {
    // Create an object to store the count of each state
    const stateCounts = {};
  
    // Iterate through the breweries array and count occurrences of each city
    breweries.forEach(brewery => {
      const state = brewery.state;
      if (stateCounts[state]) {
        stateCounts[state]++;
      } else {
        stateCounts[state] = 1;
      }
    });
  
    // Find the city with the highest count
    let mostPopularState = '';
    let maxCount = 0;
  
    for (const state in stateCounts) {
      if (stateCounts[state] > maxCount) {
        mostPopularState = state;
        maxCount = stateCounts[state];
      }
    }

    console.log(maxCount);
    console.log(mostPopularState);
    
    setPopState(mostPopularState);

  }

  function handleWebsite(){
    setSearchBars(barsWithWebsites);
    calculateMostPopularCity(searchBars);
    calculateMostPopularState(searchBars);
  }

  function handlePhone(){
    setSearchBars(barsWithPhoneNumbers);
    calculateMostPopularCity(searchBars);
    calculateMostPopularState(searchBars);
  }

  function printAllBars(array){
    for (let i = 0; i < array.length;i++){
      console.log(array[i].name);
    }
  }



  return (
    <>

      <h1>Total Bars: {totalBars}</h1>

      <div className='stats'>
        <h1 className='stats-box'>Most Popular State: {popState}</h1>
        <h1 className='stats-box'>Most Popular City: {popCity}</h1>
      </div>

      <div className='search-container'>
        <input type="text" value={search} onChange={updateSearch} placeholder="Search bars by name..."></input>
        <button onClick={searchByName}>click to search</button>
      </div>
      


      <div class="filter-container">
        <button class="filter-btn" onClick={handleWebsite}>Show All</button>
        <button class="filter-btn" onClick={handleWebsite}>Has Website</button>
        <button class="filter-btn" onClick={handlePhone}>Has Phone Number</button>
      </div>

          <h2>Search Results: {searchBars.length}</h2>
          
          {searchBars.length > 0 || !search==="" ? (

          <table >
            <thead>
              <tr>
                <th>Name</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Website</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {searchBars.map(bar => (
                <tr key={bar.id}>
                  <td>{bar.name}</td>
                  <td>{bar.street}</td>
                  <td>{bar.city}</td>
                  <td>{bar.state}</td>
                  <td><a href={bar.website_url}>{bar.website_url}</a></td>
                  <td>{bar.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

      ) : (
        <div>
          <p>No bars found matching the search criteria. Here are all Brewries!</p>
          <table >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Street</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {allBars.map(bar => (
                  <tr key={bar.id}>
                    <td>{bar.name}</td>
                    <td>{bar.street}</td>
                    <td>{bar.city}</td>
                    <td>{bar.state}</td>
                    <td><a href={bar.website_url}>{bar.website_url}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
    </>
  )
}

export default App

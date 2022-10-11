import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO -- add state for zip / search and add event listeners to the inputs
  const [zip, setZip] = useState('93117');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search
  //added secret
  const handleClick = async () => {
    setLoading(true);
    const data = await fetchBusinesses(zip, search);
    setBusinesses(data);
    setLoading(false);
  };
  

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input type="text" placeholder="zip" onChange={((e) => {
            setZip(e.target.value);
          })}/>
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder="Search..." onChange={((e) => {
            setSearch(e.target.value);
          })} />
        </div>
        <button onClick={handleClick}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;

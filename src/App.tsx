import Header from './components/Header'
import Search from './components/Search'
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import Fuse from 'fuse.js'
import Cities from './components/Cities';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0,50,20,50),
      textAlign: 'center',
      background: 'linear-gradient(to right, #3494e6, #ec6ead)',
      margin: 100,
    },
    
  }),
);

// server response interface
interface ServerResponse {
  data: Map<string ,Array<string>>
}

const App = () =>{
  const [cities, setCities] = useState(['']);
  const [searchQuery, setSearchQuery] = useState('');
  var citiesArray: string[] = [];

  // fuse for the fuzzy search
  const fuse = new Fuse(cities,{
    shouldSort: true,
    includeScore: true,
    minMatchCharLength: 2
  })
  const filteredCities = fuse.search(searchQuery);
  const classes = useStyles();

  // fetching data from API
  useEffect(() => {
    axios.get<ServerResponse>('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json')
    .then(response => {
      Object.values(response.data).map((country: string[]) => {
        citiesArray = [...citiesArray,...country];
      })

    setCities(citiesArray);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  //  handling input change
  const handleOnInputChange =(value: string) =>{
    setSearchQuery(value);
  }
 
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Header/>
            <Search onKeyChange={(value: string) => handleOnInputChange(value)}/>
            <Cities cityList = {filteredCities}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

}

export default App;

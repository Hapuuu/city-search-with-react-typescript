import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
      textAlign: 'center',
      paddingBottom: '50px',
      color: 'white'
    },
  }),
);

type Props = {
  onKeyChange: any
}

const Search: React.FC<Props> = ({onKeyChange}) => {
    const classes = useStyles();
    return (
        <div>

            <form className={classes.root} noValidate autoComplete="off"> 
                <TextField 
                label="Cities" variant="outlined" placeholder="Search for a city" 
                onChange={(event) => onKeyChange(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                />
            </form>
        </div>
    )
}

export default Search

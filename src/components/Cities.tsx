import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fuse from 'fuse.js'
import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});


  type Props = {
      cityList: Fuse.FuseResult<string>[],
  }

const Cities: React.FC<Props> = ({cityList}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const classes = useStyles()

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //  table will only render if something's typed in the textfield
    if (cityList.length!=0) {
        return (
            <div>
                <TableContainer component={Paper} style= {{backgroundColor: 'rgba(256, 256, 256, 0.5)'}}>
                <Table className={classes.table} aria-label="city table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Score</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {cityList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((city, index) => (
                            <TableRow key={index} hover>
                                <TableCell align="center">{city.item}</TableCell>
                                <TableCell align="center">{city.score}</TableCell>
                            </TableRow>
                        ))}                 
                    </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={cityList.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </TableContainer>
            </div>
        )
    }
    else{
        return (
            <>
            </>
        )
    }


}

export default Cities

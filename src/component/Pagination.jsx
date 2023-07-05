import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from "react-redux";
import { ChangePage } from '../Features/UserSlice';
import { ChangeRowsPerPage } from '../Features/UserSlice';
export default function Pagination({count}) {

const page  = useSelector((state)=>state.app.page)
const rowsPerPage  = useSelector((state)=>state.app.rowsPerPage)

let dispatch = useDispatch()

const handleChangePage = (event ,newPage)=>{
  dispatch(ChangePage(newPage))
}

const handleChangeRowsPerPage = (event)=>{
  dispatch(ChangeRowsPerPage(event.target.value))
}
  return (
    <TablePagination
     rowsPerPageOptions={[5, 10, 15]}
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
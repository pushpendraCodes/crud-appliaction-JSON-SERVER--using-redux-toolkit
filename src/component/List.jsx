import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllAsync } from "../Features/UserSlice";
import { BsSearch } from "react-icons/bs";
import { searchUser } from "../Features/UserSlice";
import User from "./User";
import Pagination from "./Pagination";

function List() {
  const data = useSelector((state) => state.app);
  const {users} = useSelector((state) => state.app);


  let dispatch = useDispatch();

// getting all user
  useEffect(() => {
    const getUsers = () => {
      dispatch(getAllAsync());
    };
    getUsers();
  }, [users]);

  const [text, settext] = useState("");

// serach
  useEffect(() => {
    if (text) {
      dispatch(searchUser(text));
    } else {
      dispatch(getAllAsync());
    }
  }, [text]);


  const pg  = useSelector((state)=>state.app.page)
  const rpg  = useSelector((state)=>state.app.rowsPerPage)

  return (
    <div className="container ">
      <div className="mx-auto text-center my-5">
        <Link to="/add-user">
          <button className="btn add_btn">Add User</button>
        </Link>
      </div>
      <div className="search_div">
        <BsSearch />
        <input

          onChange={(e) => {
            settext(e.target.value);
          }}
          placeholder="search"
          className="search_input"
          type="text"
        />
      </div>

      <div className="mt-5">
        <h2 className="text-center">User Table</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>email</th>
              <th>city</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.users.length > 0 ?
              data.users.slice(pg * rpg, pg * rpg + rpg).map((item, i) => {
                return <User i={i} item={item} />;
              }):
              <div className="text-center">no data found</div>
              }
          </tbody>
        </Table>
      </div>

      <Pagination  count={data.users.length} />
    </div>
  );
}

export default List;

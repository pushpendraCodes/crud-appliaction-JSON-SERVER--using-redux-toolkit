import React, { useState } from "react";

import { TbEditCircle } from "react-icons/tb";
import { BsFillTrash2Fill } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import { useMemo } from "react";

function   User({ item ,i }) {
  let Navigate = useNavigate();
  let dispatch = useDispatch();
  const data = useSelector((state) => state.app.users);
  // console.log(data, "data");

  const deleteUser = (id) => {
    dispatch(deleteUserAsync(id));
  };

  const [show, setShow] = useState(false);
  const[user ,setuser]=useState(Object)

  const getUsers = (id) => {
   let  user = data.filter((item) => item.id === id);
   setuser(user[0])
   setShow(!show)

  };

  return (
    <>
      <UserModal show={show} setShow={setShow} user={user} />

      <tr key={item.id}>
        <td>{i+1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.city}</td>
        <td>
          <div className="d-flex">
            <BsFillTrash2Fill
              onClick={() => {
                deleteUser(item.id);
              }}
              color="red"
              className="mx-2"
              size={25}
            />
            <TbEditCircle
              onClick={() => {
                Navigate(`/add-user/${item.id}`);
              }}
              color="green"
              className="mx-2"
              size={25}
            />{" "}
            <GrView
              onClick={() => {
                getUsers(item.id);
              }}
              className="mx-2"
              size={25}
            />
          </div>{" "}
        </td>
      </tr>
    </>
  );
}

export default (User)

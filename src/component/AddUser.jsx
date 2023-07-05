import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CresteUserAsync } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import { UpdateUserAsync } from "../Features/UserSlice";
function AddUser() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const data = useSelector((state) => state.app.users);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    let user = data.filter((item) => item.id == id);
    setuser(user[0]);
  }, [id]);

  const [user, setuser] = useState({
    name: "",
    email: "",
    city: "",
  });

  const { name, email, city } = user ||{};

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      if (name && email && city) {
        dispatch(CresteUserAsync(user));
        navigate("/");
      }
    } else {
      if (name && email && city) {
        dispatch(UpdateUserAsync(user));
        navigate("/");
      }
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center underline">Add User</h2>
      <div className=" add_user">
        <Form onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="input"
              type="name"
              placeholder="Enter name"
              name="name"
              onChange={(e) => {
                handelChange(e);
              }}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
            <Form.Control
              name="email"
              onChange={(e) => {
                handelChange(e);
              }}
              type="email"
              placeholder="Enter email"
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>city</Form.Label>
            <Form.Control
              onChange={(e) => {
                handelChange(e);
              }}
              name="city"
              type="text"
              placeholder="city"
              value={city}
            />
          </Form.Group>

          <div>
            <Button className="mx-3" variant="primary" type="submit">
              Submit
            </Button>
            <Link to="/">Back to home</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddUser;

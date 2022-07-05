import React, { Fragment,useState } from "react";
import { HeaderContainer, FooterContainer } from "../containers";
import { Signup, Form } from "../components";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Signupp = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    address: "",
    age: ""
  });

  const { email, password, name, surname, address, age } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name, surname, address, age };
      console.log(body)
      const response = await fetch(
        "http://localhost:5000/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <HeaderContainer bg="false" />
      <Signup>
        <Signup.Container>
          <Signup.Content>
            <Signup.Header>
              <Signup.Title>Signup</Signup.Title>
            </Signup.Header>
            <Signup.InnerContent>
              <Form onSubmit={onSubmitForm}>
                <Form.FormGroup>
                  <Form.Label>Name</Form.Label>
                  <Form.Input type="text"
                  name="name"
                  value={name}
                  placeholder="name"
                  onChange={e => onChange(e)} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Surame</Form.Label>
                  <Form.Input type="text"
                  name="surname"
                  value={surname}
                  placeholder="surname"
                  onChange={e => onChange(e)} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input type="text"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={e => onChange(e)} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Address</Form.Label>
                  <Form.Input type="text"
                  name="address"
                  value={address}
                  placeholder="address"
                  onChange={e => onChange(e)} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Age</Form.Label>
                  <Form.Input type="text"
                  name="age"
                  value={age}
                  placeholder="age"
                  onChange={e => onChange(e)} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={e => onChange(e)} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Input type="text" />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Signup" />
                </Form.FormGroup>
              </Form>
            </Signup.InnerContent>
            <Signup.Footer>
              <Signup.Text>
                Already Have Account ?{" "}
                <Signup.Anchor to="/login">Login</Signup.Anchor>
              </Signup.Text>
            </Signup.Footer>
          </Signup.Content>
        </Signup.Container>
      </Signup>
      <FooterContainer />
    </Fragment>
  );
};

export default Signupp;

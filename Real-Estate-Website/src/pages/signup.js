import React, { Fragment, useState } from "react";
import { HeaderContainer, FooterContainer } from "../containers";
import { Signup, Form } from "../components";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
const Signupp = ({ setAuth }) => {
let userAddress = "aaa"

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    address: "",
    age: "",
    salary: "",
    contrat_type: "",
    id_agency: "",
  });

  const {
    name,
    surname,
    email,
    address,
    age,
    salary,
    contrat_type,
    id_agency,
    password,
  } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    let wallet = await connect_wallet()
    try {
      const body = {
        name,
        surname,
        email,
        address,
        age,
        salary,
        contrat_type,
        id_agency,
        password,
        wallet
      };
      console.log(body);
      const response = await fetch(
        "http://localhost:5000/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      console.log(parseRes.jwtToken);
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
  let addressUser;
  const rpc = "https://ithacanet.tezos.marigold.dev/";
  async function connect_wallet() {
    const Tezos = new TezosToolkit(rpc);
    const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

    Tezos.setWalletProvider(wallet);
    try {
      console.log("Requesting permissions...");
      const permissions = await wallet.client.requestPermissions();
      console.log("Got permissions:", permissions.address);
      userAddress = permissions.address;
      console.log("here", userAddress)
      return userAddress
    } catch (error) {
      console.log("Got error:", error);
      return ""
    }
  }
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
                  <Form.Input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="name"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Surame</Form.Label>
                  <Form.Input
                    type="text"
                    name="surname"
                    value={surname}
                    placeholder="surname"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Address</Form.Label>
                  <Form.Input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="address"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Age</Form.Label>
                  <Form.Input
                    type="text"
                    name="age"
                    value={age}
                    placeholder="age"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>salary</Form.Label>
                  <Form.Input
                    type="text"
                    name="salary"
                    value={salary}
                    placeholder="salary"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>contrat_type</Form.Label>
                  <Form.Input
                    type="text"
                    name="contrat_type"
                    value={contrat_type}
                    placeholder="contrat_type"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>id_agency</Form.Label>
                  <Form.Input
                    type="text"
                    name="id_agency"
                    value={id_agency}
                    placeholder="id_agency"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => onChange(e)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Input type="text" />
                </Form.FormGroup>
                <h5>LAAA{userAddress}</h5>
                <Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Signup" />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.SubmitInput
                    onClick={connect_wallet}
                    value="Connect Wallet"
                  />
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

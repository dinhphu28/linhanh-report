import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import "./LoginPage.css";
// import PropTypes from 'prop-types';
import authApi from '../../apis/authApi';
import { useNavigate } from 'react-router-dom';
import { BASE_ROOT_PATH_OF_TOMCAT } from '../../constants/global';

// LoginPage.propTypes = {
    
// };

function LoginPage(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const changeUsernameInputValue = (e) => {
        setUsername(e.target.value);
    }
    const changePasswordInputValue = (e) => {
        setPassword(e.target.value);
    }

    // Validation Form
    const validationForm = () => {
        let returnData = {
            error: false,
            msg: ""
        }

        // const {username, password} = this.state;

        // Kiểm tra username
        const re = /\S/;
        if(!re.test(username)) {
            returnData = {
                error: true,
                msg: 'Not match username format'
            }
        }

        // // Kiểm tra password dài ít nhất 8 kí tự
        // if(password.length < 8) {
        //     returnData = {
        //         error: true,
        //         msg: "Length of password must be greater than 8 character"
        //     }
        // }

        return returnData;
    }

    const fetchSignIn = async () => {
        try{
            const signInData = {
                username: username,
                password: password
            };

            const response = await authApi.put(signInData);

            console.log("Fetch successfully: ", response);

            // console.log("Login success");

            localStorage.setItem("username", response.username);
            localStorage.setItem("role", response.role);
            localStorage.setItem("jwtToken", response.token);
            localStorage.setItem("assignedGroups", JSON.stringify(response.assignedGroups));
            //sessionStorage.setItem("token", response.description);

            navigate(BASE_ROOT_PATH_OF_TOMCAT + "/");

            props.onHandleChange(true);

        } catch(error) {
            // console.log("Failed to fetch sign in: ", error);
            alert("Invalid username or password or OTP!");
        }
    }

    const submitForm = (e) => {
        e.preventDefault();

        const validation = validationForm();

        if(validation.error) {
            alert(validation.msg);
        } else {
            alert("Submit form sign in success");
            fetchSignIn();
        }
    }

    return (
        <div  className="d-flex align-items-center justify-content-center">
            <Form className='login-form'
                onSubmit={e => {
                    submitForm(e);
                }}
            >
                <FormGroup>
                    <Label for='username'>
                        Username:
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        placeholder='Type username'
                        type='text'
                        onChange={e => changeUsernameInputValue(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>
                        Password:
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        placeholder='Type your password'
                        type='password'
                        onChange={e => changePasswordInputValue(e)}
                    />
                </FormGroup>
                <Button
                    color='primary'
                    block={true}
                    outline={true}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage;
import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Form, Input, Button } from 'antd';
import axios from 'axios';



const tailLayout = {
    wrapperCol: { offset: 9, span: 1 },

};

const Register = () => {

    const [, setUser] = useContext(UserContext)
    const [input, setInput] = useState({ name: "", email: "", password: "" })

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/register`, {
            name: input.name,
            email: input.email,
            password: input.password
        })
            .then((res) => {
                var user = res.data.user
                var token = res.data.token
                var currentUser = { name: user.name, email: user.email, token }
                setUser(currentUser)
                localStorage.setItem("user", JSON.stringify(currentUser))
                window.location = "/"
            })
            .catch((err) => {
                alert(err)
            })
    }



    const handleChange = (e) => {
        let name = e.target.name
        console.log(name);
        let value = e.target.value
        switch (name) {
            case "name":
                setInput({ ...input, name: value })
                break;
            case "email":
                setInput({ ...input, email: value })
                break;
            case "password":
                setInput({ ...input, password: value })
                break;

            default:
                break;
        }
    }



    return (
        <Form
            style={{ margin: 150, paddingLeft: 350, paddingRight: 350 }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onSubmitCapture={handleSubmit}
        >
            <h1 style={{ textAlign: "center", marginBottom: 40 }}>Register</h1>
            <strong>Name :</strong>
            <Input value={input.name} name="name" onChange={handleChange} required /><br /><br />

            <strong>Email :</strong>
            <Input value={input.email} name="email" onChange={handleChange} type="email" required /><br /><br />

            <strong>Password :</strong>
            <Input.Password value={input.password} name="password" onChange={handleChange} required minLength={6} /><br /><br />


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Register
        </Button>
            </Form.Item>
        </Form>
    );
};

export default Register
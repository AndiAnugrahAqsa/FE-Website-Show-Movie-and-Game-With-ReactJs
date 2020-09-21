import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Form, Input, Button } from 'antd';
import axios from 'axios';



const tailLayout = {
    wrapperCol: { offset: 9, span: 1 },

};

const Register = () => {

    const [user] = useContext(UserContext)
    const [input, setInput] = useState({ current_password: "", new_password: "", new_confirm_password: "" })

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`https://backendexample.sanbersy.com/api/change-password`, {
            current_password: input.current_password,
            new_password: input.new_password,
            new_confirm_password: input.new_confirm_password
        },
            { headers: { "Authorization": `Bearer ${user.token}` } }
        )
            .then((res) => {
                console.log(res);
                setInput({ current_password: "", new_password: "", new_confirm_password: "" })
                alert("Change password success")
            })

            .catch((err) => {
                alert(err)
            })
    }



    const handleChange = (e) => {
        let name = e.target.name
        console.log(name);
        let value = e.target.value
        console.log(value);
        switch (name) {
            case "current_password":
                setInput({ ...input, current_password: value })
                break;
            case "new_password":
                setInput({ ...input, new_password: value })
                break;
            case "new_confirm_password":
                setInput({ ...input, new_confirm_password: value })
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
            <h1 style={{ textAlign: "center", marginBottom: 40 }}>Change Password</h1>
            <strong>Current Password :</strong>
            <Input.Password value={input.current_password} name="current_password" onChange={handleChange} required minLength={6} /><br /><br />

            <strong>New Password :</strong>
            <Input.Password value={input.new_password} name="new_password" onChange={handleChange} type="new_password" required minLength={6} /><br /><br />

            <strong>New Confirm Password :</strong>
            <Input.Password value={input.new_confirm_password} name="new_confirm_password" onChange={handleChange} required minLength={6} /><br /><br />


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Change Password
        </Button>
            </Form.Item>
        </Form>
    );
};

export default Register
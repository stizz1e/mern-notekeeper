import {useState} from 'react';
import axios from '../api/axios';
import { Form, Button } from "react-bootstrap";

export default function SignupForm() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

     const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            await axios.post('/api/auth/register', {username, password});
            setMsg('User registered! You can now log in.');
            setUserName('');
            setPassword('');
        } catch(err: any){
            setMsg(err.response?.data?.message || 'Something went wrong' );
        }
     }
    
     return (
        <Form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant='primary' type="submit">Register</Button>
            <p>{msg}</p>
        </Form>
     );
};

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if(!name) alert('Please enter your name');
        registerWithEmailAndPassword(name, email, password);
            }
                useEffect(() => {
                    if(loading) return;
                    if(user) navigate('/countries');
                    if(user) console.log("User info: ", user);
                }, [user, loading]);

                return (
                    <div>
                        <h1>Register</h1>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=" Full Name"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <Button onClick={register}>Register</Button>
                    </div>
                );
        }

export default Register;
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [validated, setvalidated] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginForm = event.currentTarget;

        if (loginForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setvalidated(true);

        const data = {
            email: form.email,
            password: form.password
        }

        axios.post(
            'http://127.0.0.1:8000/api/auth/login/', data
        ).then((resp) => {
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    user: resp.data.user,
                    access: resp.data.access,
                    refresh: resp.data.refresh
                })
            );
            navigate('/');
        }).catch(error => {
            console.log('errorerrorerror', error)
            if (error.message) {
                setError(error.request.response);
            }
        })
    }


  return (
    <Form
        id='registration-form'
        className="border p-4 rounded"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
            value={form.email || ''}
            type="email"
            required
            placeholder="Enter Email"
            onChange={(event) => setForm({...form, email: event.target.value})}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
            value={form.password || ''}
            minLength={8}
            maxLength={128}
            required
            type="password"
            placeholder="Enter Password"
            onChange={(event) => setForm({...form, password: event.target.value})}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  );
}

export default LoginForm;
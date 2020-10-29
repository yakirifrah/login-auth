import React, { useState } from 'react';
import { Form } from '../components';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();
    if (formIsValid()) {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://private-052d6-testapi4528.apiary-mock.com/authenticate',
          {
            email,
            password,
          },
        );
        const { token } = response.data;
        setLoading(false);
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
        }
        history.push('/browse');
      } catch (error) {
        setError((prevError) => {
          return {
            ...prevError,
            server: `${error.message}`,
          };
        });
      }
    }
  };

  const handleChange = (event, type) => {
    event.preventDefault();
    setError((prevError) => {
      prevError[type] = '';
      return {
        ...prevError,
      };
    });
    type === 'email' ? setEmail(event.target.value) : setPassword(event.target.value);
  };

  const emailIsValid = (value = email) => {
    let valid = false;
    const emailPattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );
    if (email && emailPattern.test(email)) {
      valid = true;
    }
    return valid;
  };

  const passwordIsValid = (value = password) => {
    let valid = false;
    const letterRe = /[A-Za-z]/,
      numericRe = /[0-9]/,
      uppercaseRe = /[A-Z]/;
    const lengthOfPasswordValid = password.length >= 8 && password.length <= 30;
    const otherRegValid =
      letterRe.test(password) && numericRe.test(password) && uppercaseRe.test(password);
    if (lengthOfPasswordValid && otherRegValid) {
      valid = true;
    }
    return valid;
  };

  const setEmailError = (value) => {
    if (!value) {
      return setError((prevError) => {
        return {
          ...prevError,
          email: 'Please enter email Address.',
        };
      });
    }
    const emailPattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );
    if (!emailPattern.test(email)) {
      return setError((prevError) => {
        return {
          ...prevError,
          email: 'Please enter valid email address.',
        };
      });
    }
  };

  const setPasswordError = (value) => {
    if (!value || value.length < 8 || value.length > 30) {
      return setError((prevError) => {
        return {
          ...prevError,
          password: 'Your password must be between 8 and 30 characters.',
        };
      });
    }
    const letterRe = /[A-Za-z]/,
      numericRe = /[0-9]/,
      uppercaseRe = /[A-Z]/;
    if (!letterRe.test(password)) {
      return setError((prevError) => {
        return {
          ...prevError,
          password: 'You insert invalid characters.(only English)',
        };
      });
    }

    if (!numericRe.test(password)) {
      return setError((prevError) => {
        return {
          ...prevError,
          password: 'Your password must contain at least one number (0-9)!',
        };
      });
    }

    if (!uppercaseRe.test(password)) {
      return setError((prevError) => {
        return {
          ...prevError,
          password: 'Your password must must contain at least one uppercase letter (A-Z)!',
        };
      });
    }
  };

  const handleOnBlur = (event, type) => {
    event.preventDefault();
    switch (type) {
      case 'email':
        setError((prevError) => {
          return {
            ...prevError,
            email: '',
          };
        });
        setEmailError(email);
        break;
      case 'password':
        setError((prevError) => {
          return {
            ...prevError,
            password: '',
          };
        });
        setPasswordError(password);
        break;
      default:
        break;
    }
  };

  const formIsValid = () => {
    return emailIsValid(email) && passwordIsValid(password);
  };

  return (
    <>
      <Wrapper>
        <Form>
          <Form.Base onSubmit={handleLogin}>
            <Form.Label>
              <h3>Email address:</h3>
              <Form.Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(event) => handleChange(event, 'email')}
                onBlur={(event) => handleOnBlur(event, 'email')}
              />
              <Form.Error>{error?.email}</Form.Error>
            </Form.Label>
            <Form.Label>
              <h3>Password:</h3>
              <Form.Input
                placeholder="Password"
                type="password"
                value={password}
                autoComplete="off"
                onChange={(event) => handleChange(event, 'password')}
                onBlur={(event) => handleOnBlur(event, 'password')}
              />
              <Form.Error>{error?.password}</Form.Error>
            </Form.Label>
            <Form.Error>{error?.server}</Form.Error>
            <Form.Submit disabled={!formIsValid() || loading} type="submit">
              {loading && <Form.Indicator className="fa fa-refresh fa-spin" />}
              <span>Login</span>
            </Form.Submit>
          </Form.Base>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

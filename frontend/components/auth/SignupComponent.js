import { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import { signup, isAuth } from '../../actions/auth';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className='alert alert-warning'>Loading...</div> : '';

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : '';

  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : '';

  const signupForm = () => {
    return (
      <Container className='form'>
        <h2 className='text-center pt-4 pb-4'>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={handleChange('name')}
                type='text'
                className='form-control'
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={handleChange('email')}
                type='email'
                className='form-control'
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Password</Label>
              <Input
                value={password}
                onChange={handleChange('password')}
                type='password'
                className='form-control'
              />
            </FormGroup>
          </Col>
          <Button className='btn btn-dark'>Sign Up</Button>
        </Form>
      </Container>
    );
  };

  return (
    <Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
    </Fragment>
  );
};

export default SignupComponent;

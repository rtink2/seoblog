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

import { signin, authenticate, isAuth } from '../../actions/auth';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user ingo to localstorage
        // authenticate user
        authenticate(data, () => {
          Router.push('/');
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

  const signinForm = () => {
    return (
      <Container className='form'>
        <h2 className='text-center pt-4 pb-4'>Sign In</h2>
        <Form onSubmit={handleSubmit}>
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
          <Button className='btn btn-dark'>Sign In</Button>
        </Form>
      </Container>
    );
  };

  return (
    <Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signinForm()}
    </Fragment>
  );
};

export default SigninComponent;

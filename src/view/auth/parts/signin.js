import React, { useState } from 'react';
import InputError from 'view/shared/error-message';

const SignIn = ({ onSignIn, errors, }) => {

  const [inputs, setInputs] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignIn && onSignIn({ email: inputs.email, password: inputs.password })
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    // TODO delete
    // console.log(inputs)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form flex-column align-content-end">
      <h3>Signin</h3>
      <label className="form-field-label">email</label>
      <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
      <label className="form-field-label">password</label>
      <input onChange={handleChange} name="password" type="password" placeholder='password' value={inputs.password} />
      <InputError errors={errors} messageFormatter={e => e?.message}></InputError>
      <button className="button  primary">signin</button>
    </form>
  );
};

export default SignIn
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import './login.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword1: '',
    rPassword2: '',
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales');
    }

    dispatch(startRegister(rEmail, rPassword1, rName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lPassword"
                value={lPassword}
                autoComplete="off"
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword1"
                value={rPassword1}
                autoComplete="off"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="rPassword2"
                value={rPassword2}
                autoComplete="off"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group mb-3">
              <input type="submit" className="btnSubmit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

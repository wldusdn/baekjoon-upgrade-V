import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { loginUser } from '../axios/auth';
import '../styles/Login.css';
import HomeBtn from '../components/HomeBtn';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loginError, setLoginError] = React.useState('');
  const { setIsLoggedIn, setEmail } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', formData.email);
      setEmail(formData.email);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setLoginError('이메일 또는 비밀번호가 틀렸습니다');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login_container">
      <div className="login_mainContainer">
        <HomeBtn />
        <h1 className="login_Login_title">로그인</h1>
        <form onSubmit={handleSubmit} className="login_form">
          <div className="login_input-group">
            <input
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login_input"
              required
            />
            {errors.email && <div className="login_error">{errors.email}</div>}
            <div className="login_v-line"></div>
          </div>
          <div className="login_input-group">
            <input
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login_input"
              required
            />
            {errors.password && (
              <div className="login_error">{errors.password}</div>
            )}
          </div>
          {loginError && <div className="login_login_error">{loginError}</div>}
          <div className="login_loginContainer">
            <div className="login_phrase">
              <p>코딩테스트에 도전해보세요!</p>
            </div>
            <button type="submit" className="login_loginbtn">
              로그인
            </button>
          </div>
        </form>
      </div>
      <div className="login_divider" />
      <div className="login_subContainer">
        <h1 className="login_phrase2">계정이 없으신가요?</h1>
        <button onClick={handleSignUpClick} className="login_signupbtn">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;

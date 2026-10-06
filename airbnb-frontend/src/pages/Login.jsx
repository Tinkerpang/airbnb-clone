import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register, error, setError } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (isRegister && username.trim().length < 2) return 'Please enter your name.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validation = validate();
    setValidationError(validation);
    if (validation) return;

    setSubmitting(true);
    const success = isRegister
      ? await register(username, email, password, 'user')
      : await login(email, password);
    setSubmitting(false);

    if (success) navigate('/');
  };

  return (
    <div>
      <Header />
      <div className="auth-page">
        <div className="auth-card">
          <h2>{isRegister ? 'Create an account' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                Full name
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. Thabo Mokoena" />
              </label>
            )}
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </label>

            {(validationError || error) && <p className="error-text">{validationError || error}</p>}

            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Please wait...' : isRegister ? 'Sign up' : 'Login'}
            </button>
          </form>
          <p className="auth-toggle">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button className="link-btn" onClick={() => setIsRegister((v) => !v)}>
              {isRegister ? 'Login' : 'Sign up'}
            </button>
          </p>
          <Link to="/" className="auth-back">&larr; Back to home</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

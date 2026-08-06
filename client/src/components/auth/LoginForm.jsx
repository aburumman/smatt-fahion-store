import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateEmail, validatePassword } from '../../utils/validators';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    const success = await login(formData);
    if (success) {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <input type="checkbox" style={{ accentColor: 'var(--accent-gold)' }} />
          Remember me
        </label>
        <a href="#" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>Forgot Password?</a>
      </div>

      <Button type="submit" block size="lg" loading={loading}>
        Sign In
      </Button>

      <div className="auth-footer">
        Don't have an account? <Link to="/register">Create Account</Link>
      </div>
    </form>
  );
};

export default LoginForm;

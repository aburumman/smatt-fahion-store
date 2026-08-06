import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength; // 0-4
  };

  const strength = getPasswordStrength();
  const strengthColors = ['#dc2626', '#f97316', '#eab308', '#22c55e', '#16a34a'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    let confirmError = null;
    
    if (formData.password !== formData.confirmPassword) {
      confirmError = 'Passwords do not match';
    }
    
    if (nameError || emailError || passwordError || confirmError) {
      setErrors({ 
        name: nameError, 
        email: emailError, 
        password: passwordError,
        confirmPassword: confirmError
      });
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const success = await register(registerData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      
      <div style={{ position: 'relative', marginBottom: formData.password ? '2rem' : '0' }}>
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          style={{ marginBottom: '0.5rem' }}
        />
        
        {formData.password && (
          <div style={{ position: 'absolute', bottom: '-1.5rem', left: 0, right: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, display: 'flex', gap: '4px', height: '4px' }}>
              {[1, 2, 3, 4].map(level => (
                <div 
                  key={level} 
                  style={{ 
                    flex: 1, 
                    backgroundColor: strength >= level ? strengthColors[strength] : 'var(--border)',
                    borderRadius: '2px',
                    transition: 'background-color 0.3s ease'
                  }} 
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: strengthColors[strength], fontWeight: 500, width: '60px', textAlign: 'right' }}>
              {strengthLabels[strength]}
            </span>
          </div>
        )}
      </div>

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        style={{ marginTop: formData.password ? '0' : '0' }}
      />

      <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <input type="checkbox" required style={{ accentColor: 'var(--accent-gold)', marginTop: '0.25rem' }} />
          <span>I agree to the <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Privacy Policy</a></span>
        </label>
      </div>

      <Button type="submit" block size="lg" loading={loading}>
        Create Account
      </Button>

      <div className="auth-footer">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </form>
  );
};

export default RegisterForm;

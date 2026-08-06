import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  icon,
  placeholder = ' ', // needs to be space for floating label to work
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${error ? 'input-error' : ''} ${className}`}>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        id={name}
        {...props}
      />
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}
      
      {isPassword && (
        <button
          type="button"
          className="input-icon"
          onClick={() => setShowPassword(!showPassword)}
          style={{ background: 'none', border: 'none' }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
      
      {icon && !isPassword && (
        <div className="input-icon">{icon}</div>
      )}

      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;

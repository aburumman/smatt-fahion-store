import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container not-found">
      <div className="not-found-code">404</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '500px', marginBottom: '2.5rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button size="lg" onClick={() => navigate('/')}>
        Return to Homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { usersAPI } from '../services/api';

const ProfilePage = () => {
  const { user, logout, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      setFormData({ name: user.name || '', email: user.email || '' });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) return null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API update
      // const res = await usersAPI.updateProfile(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateProfile({ ...user, ...formData });
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassLoading(true);
    try {
      // await usersAPI.updatePassword(passwordData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      toast.error('Failed to update password');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="container dashboard-layout" style={{ animation: 'fadeIn 0.5s ease' }}>
      <aside className="dashboard-sidebar">
        <div className="profile-avatar-section">
          <div className="avatar-lg">{getInitials(user.name)}</div>
          <div>
            <h3 style={{ margin: 0 }}>{user.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user.email}</p>
          </div>
        </div>
        
        <nav className="dashboard-nav">
          <Link to="/profile" className="active"><FiUser /> Profile Settings</Link>
          <Link to="/orders"><FiPackage /> Order History</Link>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            style={{ 
              padding: '0.75rem 1rem', 
              background: 'none', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              color: '#dc2626',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>
      
      <main>
        <h1 style={{ marginBottom: '2rem' }}>Account Settings</h1>
        
        <div className="dashboard-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Personal Information</h2>
          <form onSubmit={handleUpdateProfile}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '500px' }}>
              <Input 
                label="Full Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <Input 
                label="Email Address" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
              <Button type="submit" loading={loading} style={{ alignSelf: 'flex-start' }}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        <div className="dashboard-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Change Password</h2>
          <form onSubmit={handleUpdatePassword}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '500px' }}>
              <Input 
                label="Current Password" 
                type="password" 
                value={passwordData.currentPassword} 
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} 
                required 
              />
              <Input 
                label="New Password" 
                type="password" 
                value={passwordData.newPassword} 
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} 
                required 
              />
              <Button type="submit" variant="outline" loading={passLoading} style={{ alignSelf: 'flex-start' }}>
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

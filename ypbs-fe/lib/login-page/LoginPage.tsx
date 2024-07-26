'use client';

import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid } from '@mui/material';

export function LoginPage()  {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Example validation
    if (username.trim() === '' || password.trim() === '') {
      setError(true);
    } else {
      setError(false);
      // Handle login logic here
      console.log('Username:', username);
      console.log('Password:', password);
    }
  };
 return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error && username.trim() === ''}
            helperText={error && username.trim() === '' ? 'Username is required' : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && password.trim() === ''}
            helperText={error && password.trim() === '' ? 'Password is required' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

'use client';

import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid, FormControlLabel, Checkbox, Link, InputAdornment, IconButton, Card } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import yte_logo from "./../../public/images/yte-logoyatay.jpg"
import BackgroundImage from './BackgroundImage';
import axios from 'axios';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Handle later
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const usernameError = username.trim() === '';
    const passwordError = password.trim() === '';

    if (usernameError || passwordError) {
      setError({ username: usernameError, password: passwordError });
    } else {
      setError({ username: false, password: false });
      setLoginError('');

      try {

        const loginRequest = {
          username: username.trim(),
          password: password.trim()
        }
        
        const response = await axios.post("api/auth/login", loginRequest);
        console.log('Giriş:', response.data);
        localStorage.setItem("secret", response.data)

      } catch (error) {
        console.error('Hata:', error);
        setLoginError('Giriş başarısız.');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <BackgroundImage />
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
        }}
      >

        { /* Serdar'dan gelen Logo Componentı koyulacak */}
        <Image
          src={yte_logo}
          alt="Logo"
          width={400}
          height={200}
          quality={100}
          draggable="false"
        />

        <Typography color="black" component="h1" variant="h5">
          Personel Bilgi Sistemi
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error.username}
            helperText={error.username ? 'Username is required' : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
            helperText={error.password ? 'Password is required' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label={<Typography >Beni Hatırla</Typography>}
            />
            <Link href="/sifremi-unuttum" variant="body2" sx={{ color: 'black' }}>
              Şifremi Unuttum
            </Link>
          </Box>
          {loginError && (
            <Typography color="error" variant="body2">
              {loginError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            GİRİŞ
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginPage;

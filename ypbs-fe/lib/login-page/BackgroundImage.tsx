import Image from 'next/image';
import Box from '@mui/material/Box';

export default function BackgroundImage() {
  return (
    <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <Image
          src="/images/login-background.png"
          alt="Background"
          fill
          quality={100}
          sizes="(max-width: 600px) 100vw, 600px"
        />
    </Box>
  );
}
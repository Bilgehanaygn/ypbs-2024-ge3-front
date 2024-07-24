import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function BornTodayCard({name, surname, birthdate, image}) {

    const cardStyle = {
        marginBottom: '16px',
        maxWidth: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        textAlign: 'center',
      };
    
      const imageContainerStyle = {
        width: '100px',
        height: '100px',
        marginTop: '16px',
        marginBottom: '16px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
      };
    
      const imageStyle = {
        objectFit: 'cover',
      };
    
      const textStyle = {
        marginBottom: '20px',
        lineHeight: '1.6',
      };

      const nameStyle = {
        fontSize: '1.5rem', 
        fontWeight: 'bold',
      };
    
      return (
        <Card style={cardStyle}>
          <Typography variant="h5"> BUGÜN DOĞANLAR</Typography>
          <Box style={imageContainerStyle}>
            {image ? (
              <Image
                src={`data:image/png;base64, ${image}`}
                width={100}
                height={100}
                alt="User Image"
                style={imageStyle}
              />
            ) : (
              <Typography>No Image Available</Typography>
            )}
          </Box>
          <Box style={textStyle}>
            <Typography variant="h6">İyi ki doğdun!</Typography>
            <Typography style={{...nameStyle, marginBottom:"8px"}} >{name + " " + surname}</Typography>
            <Typography style={{marginBottom: "8px"}}>Seninle daha güçlüyüz!</Typography>
            <Typography>{birthdate}</Typography>
          </Box>
        </Card>

    );
}
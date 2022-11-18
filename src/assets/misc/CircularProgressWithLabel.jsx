import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react'

export default function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant={props.value===100?'indeterminate':'determinate'} {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              fontSize: '94px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography fontSize={11} variant="caption" component="div" color="text.secondary">
              {`${Math.round(props.value)}`}
            </Typography>
          </Box>
        </Box>
    );
}

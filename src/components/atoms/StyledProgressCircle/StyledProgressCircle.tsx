import { CSSProperties, FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

export interface StyledProgressCircleProps {
  undertone?: CSSProperties['color'];
  overtone?: CSSProperties['color'];
  size?: number;
  thickness?: number;
  value?: number;
}

export const StyledProgressCircle: FC<StyledProgressCircleProps> = ({
  undertone = '#BABCBE',
  overtone = '#4A6BB7',
  size = 32,
  thickness = 8,
  value = 20,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        size={size}
        sx={{
          color: undertone,
        }}
        thickness={thickness}
        value={100}
        variant="determinate"
      />
      <CircularProgress
        disableShrink
        size={size}
        sx={{
          color: overtone,
          position: 'absolute',
          left: 0,
        }}
        thickness={thickness}
        value={value}
        variant={'determinate'}
      />
    </Box>
  );
};

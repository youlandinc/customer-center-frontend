import {
  Icon,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface ActionMenuProps {
  label: ReactNode;
  icon?: React.ElementType;
  path?: string;
  handleClick?: (event?: unknown) => void;
  hidden?: boolean;
  menuSx?: SxProps;
  disabled?: boolean;
  loading?: boolean;
  isSelected?: boolean;
  iconSx?: SxProps;
}

export interface StyledActionsMenuProps extends MenuProps {
  menus?: ActionMenuProps[];
  paperSx?: SxProps;
}

export const StyledAnchorMenus: FC<StyledActionsMenuProps> = ({
  menus,
  sx,
  paperSx,

  ...rest
}) => {
  return (
    <Menu
      slotProps={{
        paper: {
          sx: {
            // minWidth: 160,
            boxShadow:
              '0px 10px 10px 0px rgba(17, 52, 227, 0.10), 0px 0px 2px 0px rgba(17, 52, 227, 0.10)',
            borderRadius: 2,
            '& .MuiList-root': {
              padding: 0,
            },
            ...paperSx,
          },
        },
      }}
      sx={{
        '& .MuiMenu-list': {
          p: 0,
        },
        ...sx,
      }}
      {...rest}
    >
      {menus?.map((item, index) => (
        <MenuItem
          disabled={item?.disabled}
          key={index}
          onClick={item?.handleClick}
          selected={item?.isSelected}
          sx={{ p: '14px 24px' }}
        >
          <Stack alignItems={'center'} direction={'row'} gap={1.25}>
            {item?.icon && (
              <Icon
                component={item.icon}
                sx={{ width: 20, height: 20, ...item?.iconSx }}
              />
            )}
            <Typography component={'div'} variant={'body2'}>
              {item.label}
            </Typography>
          </Stack>
        </MenuItem>
      ))}
    </Menu>
  );
};

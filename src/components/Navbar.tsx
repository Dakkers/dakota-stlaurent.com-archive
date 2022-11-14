import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link as RouterLink } from "react-router-dom";

import DakLogoImg from './dak-letters.png'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 320;
const navItems = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'Tools',
    to: '/tools',
  },
  // {
  //   text: 'About',
  //   to: '/about',
  // },
  {
    text: 'Blog',
    href: 'https://dakotastlaurent.wordpress.com/',
  },
  {
    text: 'Notes',
    href: 'https://notes.dakota-stlaurent.com/',
  },
  // {
  //   text: 'Tools',
  //   to: '/tools',
  // },
  // {
  //   text: 'Portfolio',
  //   to: '/portfolio',
  // },
];

interface CustomLinkProps {
  color?: string;
  href?: string;
  text: string;
  to?: string;
}

function CustomLink ({ color, href, text, to }: CustomLinkProps) {
  const sx = { color: color ?? 'white', fontWeight: 600 }

  if (href) {
    return (
      <Link href={href} sx={sx}>
        {text}
      </Link>
    )
  }
  if (!to) {
    return null;
  }

  return (
    <Link component={RouterLink} sx={sx} to={to}>
      {text}
    </Link>
  )
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Dakota St. Laurent
      </Typography>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
        {navItems.map((item) => (
          <CustomLink {...item} color='black' key={item.to ?? item.href}  />
        ))}
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Box
            component="div"
            sx={{ flexGrow: 1, }}
          >
            <RouterLink to="/">
              <img src={DakLogoImg} alt="Dak Logo" style={{ width: '64px', height: '40px' }}/>
            </RouterLink>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <CustomLink key={item.to ?? item.href} {...item} />
            ))}
          </Box>

          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor='right'
          container={container}
          ModalProps={{ keepMounted: true, }}
          onClose={handleDrawerToggle}
          open={mobileOpen}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          variant="temporary"
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

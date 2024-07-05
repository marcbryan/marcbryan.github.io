import * as React from 'react';
import { useState } from 'react';
import { LANGUAGES } from '../constants';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import "/node_modules/flag-icons/css/flag-icons.min.css";

function getCode(newLang) {
  return LANGUAGES.find(obj => { return obj.lang === newLang }).code;
}

function ResponsiveAppBar({ lang, setLang, pages, pages2 }) {
  const { i18n, t } = useTranslation();
  const [code, setCode] = useState(getCode(lang));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickMenuItem = (event) => {
    const { newLang } = event.currentTarget.dataset;
    setLang(newLang);
    setCode(getCode(newLang));
    i18n.changeLanguage(newLang);
    handleCloseUserMenu;
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title={t("home")}>
            <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} color="inherit" component={NavLink} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages2.map((page) => (
                <MenuItem key={page.key} onClick={handleCloseNavMenu} component={NavLink} to={page.route}>
                  <Typography textAlign="center">
                    {t(page.key)}
                  </Typography>
                </MenuItem>            
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.key}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={NavLink}
                to={page.route}
              >
                {t(page.key)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t("chooseLang")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <span className={`fi fi-${code}`}></span>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {LANGUAGES.map((language) => (
                <MenuItem key={language.lang} data-new-lang={language.lang} onClick={onClickMenuItem}>
                  <ListItemIcon>
                    <span className={`fi fi-${language.code}`}></span>
                  </ListItemIcon>
                  <ListItemText>{t(language.lang)}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
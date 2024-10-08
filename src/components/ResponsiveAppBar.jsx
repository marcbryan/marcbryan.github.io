import { useState } from 'react';
import { LANGUAGES } from '../constants';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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
import SvgIcon from '@mui/material/SvgIcon';
import logo from '../assets/logo.svg?react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTheme } from '@mui/material/styles';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '/node_modules/flag-icons/css/flag-icons.min.css';

function getCode(newLang) {
  return LANGUAGES.find(obj => { return obj.lang === newLang }).code;
}

function HideOnScroll({children}) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ScrollTop({children}) {
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor",
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", zIndex: 2, bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function ResponsiveAppBar({ lang, setLang, pages, menuPages }) {
  const { mode, nextMode, toggleMode } = useThemeContext();
  const theme = useTheme();

  const { i18n, t } = useTranslation();
  const [code, setCode] = useState(getCode(lang));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const onClickMenuItem = (event) => {
    const { newLang } = event.currentTarget.dataset;
    
    i18n.changeLanguage(newLang).then(() => {
      setLang(newLang);
      setCode(getCode(newLang));
      document.documentElement.lang = newLang.toLowerCase();
    });
    
    handleCloseLangMenu();
  };

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Tooltip title={t("home")}>
                <IconButton color={(mode === "light") ? "inherit" : "primary"} sx={{ display: { xs: "none", md: "flex" } }} component={NavLink} to="/">
                  <SvgIcon component={logo} sx={{fontSize: 36}} inheritViewBox />
                </IconButton>
              </Tooltip>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  onClick={handleOpenNavMenu}
                  color={(mode === "light") ? "inherit" : "primary"}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {menuPages.map((page) => (
                    <MenuItem key={page.key} onClick={handleCloseNavMenu} component={NavLink} to={page.route}>
                      <Typography textAlign="center">
                        {t(page.key)}
                      </Typography>
                    </MenuItem>            
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.key}
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", color: (mode === "light") ? "inherit" : undefined }}
                    component={NavLink}
                    to={page.route}
                  >
                    {t(page.key)}
                  </Button>
                ))}
              </Box>
              <Box sx={{ mr: 1 }}>
                <Tooltip title={t(`activate_${nextMode()}Mode`)}>
                  <IconButton
                    onClick={toggleMode}
                    sx={{ color: (mode === "light") ? "inherit" : theme.palette.primary.main }}
                  >
                    {theme.palette.mode === "dark" ? 
                      <LightModeOutlined /> :
                      <DarkModeOutlined />}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={t("chooseLang")}>
                  <IconButton onClick={handleOpenLangMenu} sx={{ p: 0 }}>
                    <span className={`fi fi-${code}`}></span>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElLang}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElLang)}
                  onClose={handleCloseLangMenu}
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
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab size="small" aria-label={t("scrollTop_ariaLabel")}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
export default ResponsiveAppBar;
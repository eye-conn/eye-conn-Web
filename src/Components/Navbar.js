import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {  removeUserSession } from '../Utils/Common';
// import './navbar.css'


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Logout'];


export default function Navbar({setAuth: hasAuth, setAuthLoading: hasAuthLoading, soc: socket, ...props}) {

    let history = useHistory();
  //  const user = getUser();
  //  console.log(props.history)
        const isLogged = useCallback((val) => {
          hasAuth(val);
          hasAuthLoading(!val);
        },
        [hasAuth,hasAuthLoading],
      );
        // handle click event of logout button
        const handleLogout = () => {
        isLogged(false);
        removeUserSession();
        history.push('/login');
        }

        const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settingDesc =  {
    "Profile" : (setting)=>{
      return   <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
      
    },
    "Account" : (setting)=>{
      return       <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
      
    },
    "Logout" : (setting)=>{
      return  <MenuItem key={setting} onClick={()=>{handleLogout();handleCloseUserMenu()}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
          },
  }

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


  return (
    <>
    {(props.auth)?
                <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} to={'/'+page.toLowerCase()} style={{ textDecoration: "none"}}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1.5, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                settingDesc[setting](setting)
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </Box>
    </>
    :
    <>
    </>
    }
    </>
  );
}

// export default function Navbar({setAuth: hasAuth, setAuthLoading: hasAuthLoading, soc: socket, ...props}) {
//   let history = useHistory();
//   //  const user = getUser();
//   //  console.log(props.history)
//         const isLogged = useCallback((val) => {
//           hasAuth(val);
//           hasAuthLoading(!val);
//           // socket.emit("leave_room",getToken());
//         },
//         [hasAuth,hasAuthLoading],
//       );



//         // handle click event of logout button
//         const handleLogout = () => {
//         // socket.disconnect({token: getToken()});
//         isLogged(false);
//         removeUserSession();
//         history.push('/login');
//         }


        
        
        
        



//     return (
//         <div>
//           <div id="message_list"></div>
//             <div className="header"> 
//               {/* <div className="shead1"></div>
//               <div className="shead2"></div> */}
//             {/* </div> */}
//           {(props.auth)?
//           <>
//           <div className="shead1">
//           <div><Link className="link" to='/dashboard'>
//           <div className="menu">
//               <b>Metro AFC</b>
//             </div>
//             </Link></div>
//             </div>
//             <div className="shead2">
//             <div><Link className="link" to='/topup'>
//             <div className="menu">
//               TOP UP
//             </div>
//              </Link></div>
//             <div><Link className="link" to='/travel-ledger'>
//             <div className="menu">
//               ENTRY/EXITS
//             </div>
//             </Link></div>
//             <div className="link"  onClick={handleLogout}>
//             <div className="logout">
//             {"Logout"} 
            
//             </div>
//             </div>
//             </div>
//             </>
//           :
//             <>
            
//             </>
//             }
    
//           </div>
//         </div>
//     )
// }

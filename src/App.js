import React, {useEffect } from 'react';
import { useDispatch } from 'react-redux'
import DogPosterGenerator from './components/DogPosterGenerator';
import { Typography, Container, createTheme, ThemeProvider, Box } from '@mui/material';
import {
  fetchBreedsAndSubBreedsAsync
} from './redux/reducers/dogSlice';
import './styles/reset.css'
import './App.css';

const breakpointValues = {
  xs: 0,
  sm: 450,
  md: 800,
  lg: 1000,
  xl: 1200
}

const theme = createTheme({
  breakpoints: {
    values: breakpointValues
  },
  palette: {
    primary:  {
      light: '#718792',
      main: '#455a64',
      dark: '#1c313a'
    },
    secondary: {
      light: '#efdcd5',
      main: '#bcaaa4',
      dark: '#8c7b75'
    },
    error:  {
      light: '#ff844c',
      main: '#f4511e',
      dark: '#b91400'
    },
    warning:  {
      light: '#ffe54c',
      main: '#ffb300',
      dark: '#c68400'
    },
    info:  {
      light: '#88ffff',
      main: '#4dd0e1',
      dark: '#009faf'
    },
    success:  {
      light: '#b2fab4',
      main: '#81c784',
      dark: '#519657'
    }
  },
  typography: {
    h1: {
      fontSize: '80px',
      [`@media (max-width:${breakpointValues.md}px)`]: {
        fontSize: '30px',
      }
    },
    h2: {
      fontSize: '50px',
      [`@media (max-width:${breakpointValues.md}px)`]: {
        fontSize: '20px',
        fontWeight: '700'
      },
    },
    h3: {
      fontSize: '22px',
      [`@media (max-width:${breakpointValues.md}px)`]: {
        fontSize: '16px',
        fontWeight: '500'
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '200px',
          backgroundColor: 'transparent',
          outline: '0px solid transparent',
          boxShadow: '0 0 0 0',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
              transform: 'scale(1.04)'
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        target: "_blank"
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: 200,
          borderRadius: '8px',
          margin: '5px',
          backgroundColor: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }
})

const App = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBreedsAndSubBreedsAsync('all'))
    }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{
        height:'100vh',
        width: '100vw',
        position: 'relative',
        zIndex: 1
      }}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://img.freepik.com/premium-photo/group-cute-dogs-wallpaper-graphic-designs-2d-illustration_67092-1310.jpg?w=2000)',
            zIndex: -1,
            backgroundSize: 'cover',
            opacity: 0.15
          }}
        />
          <Typography
            variant="h1"
            color="textPrimary"
            sx={{
              textShadow: '0 0 5px #fff',
              textAlign: 'center',
              paddingBottom: '30px',
              paddingTop: '20px',
              width: '100%'
            }}
          >
            Dog Poster Generator
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            sx={{
              textShadow: '0 0 5px #fff',
              textAlign: 'center',
              paddingBottom: '10px',
              width: '100%'
            }}
          >
            Get ready to see more dogs than you can handle!
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            sx={{
              textShadow: '0 0 5px #fff',
              textAlign: 'center',
              paddingBottom: '10px',
              width: '100%'
            }}
          >
            Select a breed & sub-breed (if available), then click GENERATE to see that combination.
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            sx={{
              textShadow: '0 0 5px #fff',
              textAlign: 'center',
              paddingBottom: '50px',
              width: '100%'
            }}
          >
            Click the + button to add more rows, and click the GENERATE ALL button to see the results of all your combinations.
          </Typography>
          <DogPosterGenerator />
      </Container>
    </ThemeProvider>
  );
}

export default App;

import React, {Suspense} from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ImageCard from './ImageCard'

const ImageCards = ({imagesList}) => {
    const theme = useTheme()
    let imageElements = []

    const randomizeArray = (arr) => {
        return arr.slice(0).sort(() => Math.random() - 0.5);
    }

    imagesList.forEach((imageUrl) => {
        imageElements.push(
            <ImageCard key={imageUrl} imageUrl={imageUrl} />
        )
    })

    return (
        <Box sx={{
            display: 'flex',
            position: 'absolute',
            bottom: '30px',
            padding: '10px',
            [theme.breakpoints.down('md')]: {
                top: '120px'
            },
            [theme.breakpoints.up('md')]: {
                top: '170px'
            },
            left: '10px',
            right: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: '10px'
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#555'
            }
        }}>
            {randomizeArray(imageElements)}
        </Box>
    )

}

export default ImageCards
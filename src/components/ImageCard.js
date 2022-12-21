import React from 'react'
import { Card, CardMedia, Link } from '@mui/material'
import DogeImage from '../images/doge.png'

const ImageCard = ({imageUrl}) => {

    return (
        <Card
        >
            <Link
                href={imageUrl}
            >
                <CardMedia
                    image={imageUrl}
                    alt="A dog picture"
                />
            </Link>
        </Card>
    )
}

export default ImageCard
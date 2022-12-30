import React from 'react'
import { Card, CardMedia, Link } from '@mui/material'

const ImageCard = ({imageUrl}) => {

    return (
        <Card
        >
            <Link
                href={imageUrl}
            >
                <CardMedia
                    image={imageUrl}
                    alt="A picture of a dog"
                />
            </Link>
        </Card>
    )
}

export default ImageCard
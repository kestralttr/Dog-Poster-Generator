import React, { useEffect, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectImagesList, setImagesList } from '../redux/reducers/dogSlice.js'
import { Modal, Typography, Box, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
const ImageCards = React.lazy(() => import('./ImageCards'))

const ModalContainer = ({
    setModalActive
}) => {
    const dispatch = useDispatch();
    const imagesList = useSelector(selectImagesList)

    const handleCloseModal = () => {
        dispatch(setImagesList([]))
    }

    const renderModal = () => {
            return (
                <Modal
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    open={imagesList.length ? true : false}
                    onClose={handleCloseModal}
                    aria-labelledby="Dog images modal"
                    aria-describedby="Shows dog images in a modal"
                    >
                    <Box sx={{
                        position: 'fixed',
                        top: '10%',
                        right: '10%',
                        left: '10%',
                        bottom: '10%',
                        textAlign: 'center',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        padding: '5px'

                    }}>
                        <CloseIcon
                            onClick={handleCloseModal}
                            sx={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                cursor: 'pointer'
                            }}
                            color="primary"
                        />
                        <Typography
                            id="modal-modal-title"
                            variant="h2"
                            component="h2"
                            sx={{
                                display: 'block',
                                margin: '20px 0'
                            }}
                        >
                            Enjoy your dog posters!
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            variant="h3"
                            component="h3"
                            sx={{
                                display: 'block',
                                margin: '10px 0 30px'
                            }}
                        >
                            Click on a picture to open a full-size version in a new tab.
                        </Typography>
                        <Suspense fallback={<CircularProgress color="info" />}>
                            <ImageCards imagesList={imagesList} />
                        </Suspense>
                    </Box>
                </Modal>
            )
    }

    useEffect(() => {
        if (!imagesList.length) {
            setModalActive(false)
        }
    }, [imagesList, setModalActive])

    return (
        <div className="modal__container">
            {renderModal()}
        </div>
    )
}

export default ModalContainer
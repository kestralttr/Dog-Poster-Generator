import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useTheme } from '@mui/material/styles'
import {
    selectRowsData,
    addRow,
    setSelectedBreed,
    setSelectedSubBreed,
    setImageUrls,
    setImagesList
} from '../redux/reducers/dogSlice.js'
import GenerateAllButton from './wrapped-components/GenerateAllButton.js'
import ModalContainer from './ModalContainer'
import Row from './Row.js'
import { Container, Box } from '@mui/material'

const Rows = () => {

    const dispatch = useDispatch()
    const theme = useTheme()

    const [modalActive, setModalActive] = useState(false)
    const rowsData = useSelector(selectRowsData)

    const generateAllImages = () => {
        let newImagesList = []
        rowsData.forEach((rowData) => {
            newImagesList = newImagesList.concat(rowData.imageUrls)
        })
        dispatch(setImagesList(newImagesList))
    }

    const setSelectedBreedForRow = (index) => {
        return (data) => {
            dispatch(setSelectedBreed({index, data}))
        }
    }

    const setSelectedSubBreedForRow = (index) => {
        return (data) => {
            dispatch(setSelectedSubBreed({index, data}))
        }
    }

    const setImageUrlsForRow = (index) => {
        return (data) => {
            dispatch(setImageUrls({index, data}))
        }
    }

    const renderRows = () => {
        const renderedRows = []
        let isLast = false
        rowsData.forEach((rowData, index) => {
            if (rowsData.length-1 === index) {
                isLast = true
            }
            renderedRows.push(
                <Row
                    addRow={addRow}
                    key={uuidv4()}
                    selectedBreed={rowData.selectedBreed}
                    selectedSubBreed={rowData.selectedSubBreed}
                    imageUrls={rowData.imageUrls}
                    setSelectedBreed={setSelectedBreedForRow(index)}
                    setSelectedSubBreed={setSelectedSubBreedForRow(index)}
                    setImageUrls={setImageUrlsForRow(index)}
                    isLast={isLast}
                    index={index}
                />
            )
        })
        return renderedRows
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                textAlign: 'center',
                paddingBottom: '20px',
                [theme.breakpoints.down('md')]: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                },
            }}
        >
            <ModalContainer
                modalActive={modalActive}
                setModalActive={setModalActive}
                />
            <Box className="rows">
                {renderRows()}
            </Box>
            <GenerateAllButton
                clickFunction={generateAllImages}
                sxValues={{
                    margin: '10px 0 30px'
                }}
            />
        </Container>
    )
}

export default Rows
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import DropdownContainer from './DropdownContainer.js'
import GenerateButton from './wrapped-components/GenerateButton.js'
import AddButton from './wrapped-components/AddButton.js'
import {
    selectBreedsList,
    selectBreedsAndSubBreeds,
    setImagesList,
    addRow,
    fetchRowImageUrls
} from '../redux/reducers/dogSlice.js'
import { Typography, Box } from '@mui/material'
import './DropdownContainer.js'

const Row = ({
    selectedBreed,
    setSelectedBreed,
    selectedSubBreed,
    setSelectedSubBreed,
    imageUrls,
    isLast,
    index
}) => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const breedsAndSubBreeds = useSelector(selectBreedsAndSubBreeds)
    const breedsList = useSelector(selectBreedsList)

    const selectBreed = (str) => {
        setSelectedSubBreed('')
        setSelectedBreed(str)
        dispatch(fetchRowImageUrls({
            index: index,
            breed: str
        }))
    }
    
    const selectSubBreed = (str) => {
        setSelectedSubBreed(str)
        dispatch(fetchRowImageUrls({
            index: index,
            breed: selectedBreed,
            subBreed: str
        }))
    }

    const handleGenerate = () => {
        if (imageUrls.length) {
            dispatch(setImagesList(imageUrls))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Box
            onSubmit={handleSubmit}
            className="row__container"
            data-testid="form"
            component="form"
            sx={{
                position: 'relative',
                padding: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '10px 0',
                backgroundColor: '#fff',
                borderRadius: '8px',
                cursor: 'default',
                zIndex: 1000,
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                    width: '250px',
                    height: '240px',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                },
            }}
        >
            <DropdownContainer
                className="breed-input__select"
                options={breedsList}
                updateValue={selectBreed}
                value={selectedBreed}
                name="Breed Dropdown"
                placeholderText="Select a breed"
                testId="breed-dropdown"
            />
            <DropdownContainer
                className={`subBreed-input__select`}
                options={(selectedBreed && breedsAndSubBreeds[selectedBreed]) ? breedsAndSubBreeds[selectedBreed] : []}
                updateValue={selectSubBreed}
                value={selectedSubBreed}
                name="Sub-breed Dropdown"
                placeholderText="Select a sub-breed"
                testId="subBreed-dropdown"
                enableDisabledFunctionality
            />
            <Box
                className="image-count"
                sx={{
                    display: 'flex',
                    minWidth: '120px',
                    justifyContent: 'space-between'
                }}
            >
                <Typography>Image count:</Typography>
                <Typography data-testid="image-count">{imageUrls.length}</Typography>
            </Box>
            <Box>
                <GenerateButton
                    clickFunction={handleGenerate}
                />
                {
                    isLast &&
                    <AddButton
                        clickFunction={() => {dispatch(addRow())}}
                        sxValues={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translate(0, -50%)',
                            minWidth: '34px',
                            padding: '6px',
                            right: '-50px'
                        }}
                    />
                    }
            </Box>
        </Box>
    )
}

export default Row
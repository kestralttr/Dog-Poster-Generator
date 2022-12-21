import withButtonFunctionality from '../HOCs/withButtonFunctionality'
import { Button } from '@mui/material'

const GenerateAllButton = (props) => {

    const {
        clickFunction,
        classNameString,
        variantValue,
        initialSxValues,
        sxValues
    } = props

    const additionalSxValues = {
        fontSize: '20px'
    }

    const finalSxValues = Object.assign(
        initialSxValues,
        additionalSxValues,
        sxValues
    )

    return (
        <Button
            className={classNameString}
            onClick={clickFunction}
            variant={variantValue}
            sx={finalSxValues}
            color="info"
        >
            Generate All
        </Button>
    )
}

export default withButtonFunctionality(GenerateAllButton)
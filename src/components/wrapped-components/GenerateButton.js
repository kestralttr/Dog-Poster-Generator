import withButtonFunctionality from '../HOCs/withButtonFunctionality'
import { Button } from '@mui/material'

const GenerateButton = (props) => {
    const {
        clickFunction,
        classNameString,
        variantValue,
        initialSxValues,
        sxValues
    } = props

    const finalSxValues = Object.assign(
        initialSxValues,
        sxValues
    )

    return (
        <Button
            className={classNameString}
            onClick={clickFunction}
            variant={variantValue}
            sx={finalSxValues}
        >
            Generate
        </Button>
    )
}

export default withButtonFunctionality(GenerateButton)
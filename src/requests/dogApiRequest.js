import axios from 'axios'

const dogApiRequest = ({
    onError,
    onSuccess,
    onComplete=()=>{},
    path
}) => {

    const baseUrl = 'https://dog.ceo/api/'

    axios.get(`${baseUrl}${path}`)
    .then(function (response) {
        onSuccess(response.data.message)
    })
    .catch(function (error) {
        onError(error)
    })
    .finally(function() {
        onComplete()
    })
}


export default dogApiRequest

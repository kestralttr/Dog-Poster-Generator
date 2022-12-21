import dogApiRequest from '../../requests/dogApiRequest'

export function fetchFromDogApi(path) {
    return new Promise((resolve) => {

        dogApiRequest({
            path,
            onError: (error) => {
                console.log('Error retrieving API data:', error)
            },
            onSuccess: (response) => {
                resolve(response)
            }
        })
    }
    );
  }
  
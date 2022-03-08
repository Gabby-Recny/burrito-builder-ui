export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => checkResponse(response))
      // .then(response => response.json())

}

const checkResponse = (response) => {
  if (!response.ok) {
    console.log('NOT OK', response.json())
    throw new Error(`Error`)
  } else {
    return response.json()
  }
}
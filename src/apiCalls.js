export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => checkResponse(response))

}

const checkResponse = (response) => {
  if (!response.ok) {
    console.log('NOT OK', response.json())
    throw new Error(`Error`)
  } else {
    return response.json()
  }
}

export const postNewOrder = (newData) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
  .then(response => checkResponse(response))
  // .then(getOrders())

}
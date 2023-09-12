import React from 'react'
import axios from 'axios'
const Home = () => {
  return (
    <div>
      const data = await axios.get(`https://jsonmock.hackerrank.com/api/tvseries?page = 1`);
      console.log(data)
    </div>
  )
}

export default Home
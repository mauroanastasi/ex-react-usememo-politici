import { useState, useEffect } from 'react'


function PoliticiansCard({ name, image, position, biography }) {
  console.log("render card")
  return (
    <div className='card' >
      <h3> {name} </h3>
      <img src={image} alt="pol" />
      <p>{position}</p>
      <p>{biography}</p>
    </div>
  )
}


function App() {

  const [politicians, setPolitician] = useState([])
  const loadPoliticians = async () => {
    const res = await fetch(`http://localhost:3333/politicians`)
    const data = await res.json()
    setPolitician(data)
  }

  useEffect(() => {
    loadPoliticians();
  }, []);

  return (
    <>
      <h2>Lista Politici:</h2>
      {politicians.map((p, i) => (
        <PoliticiansCard key={i} {...p} />
      ))}
    </>
  )
}

export default App

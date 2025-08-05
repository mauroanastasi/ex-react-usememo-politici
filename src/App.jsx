import React, { useState, useEffect, useMemo } from 'react'

function PoliticiansCard({ name, image, position, biography }) {
  console.log("render card")
  return (
    <div className="pol-list">
      <div className='card' >
        <h3> {name} </h3>
        <img src={image} alt="pol" />
        <p>{position}</p>
        <p>{biography}</p>
      </div>
    </div>
  )
}

const MemoizedPoliticiansCard = React.memo(PoliticiansCard)

function App() {

  const [politicians, setPolitician] = useState([]);

  const [search, setSearch] = useState("");

  const filteredPoliticians = useMemo(() => {
    console.log("filter")
    return politicians.filter(p => {
      const name = p.name.toLowerCase().includes(search.toLocaleLowerCase())
      const bio = p.biography.toLowerCase().includes(search.toLocaleLowerCase())
      return name || bio
    })
  }, [politicians, search])

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
      <h3>Ricerca</h3>
      <input type="text" placeholder='Cerca Politico' value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="pol-list">
        <h2>Lista Politici:</h2>
        {filteredPoliticians.map((p) => (
          <MemoizedPoliticiansCard key={p.id} {...p} />
        ))}
      </div>
    </>
  )
}

export default App

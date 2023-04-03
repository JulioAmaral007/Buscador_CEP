import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'

import './scss/app.scss'

type CepProps = {
  cep: number;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;

}

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState<CepProps>({})

  async function handleSearch() {

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

    } catch {
      alert("Ops erro ao buscar, verifique o CEP digitado")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>

      <div className='containerInput'>
        <input
          type="text"
          placeholder='Digite seu CEP...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' type='submit' onClick={handleSearch}>
          <FiSearch size={25} color="white" />
        </button>

      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  )
}

export default App

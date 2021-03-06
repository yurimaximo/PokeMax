import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'
import Heads from "../../components/Head/Head"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"


export const getStaticPaths = async () => {
  const maxPokemons = 251
  const api = `https://pokeapi.co/api/v2/pokemon/`

  const res = await fetch(`${api}/?limit=${maxPokemons +1}`)

  const data = await res.json()
  


  const paths = data.results.map((pokemon, index) => {
    return {
      
 

      params: { pokemon: (index+1).toString() },




    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.pokemon

 

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await res.json() 



  return {
    props: { pokemon: data },
  }
}

export default function Pokemon({ pokemon }) {
  console.log(pokemon)
  return (
    <>
<Heads/>
<Header/>

<div>

    <div className={styles.container}>
    
  

      <div className={styles.pokemon_container}>
        <h1 className={styles.title}>{pokemon.name}</h1>

        <p className={styles.number}>#0{pokemon.id}</p>
      </div>
      <Image className={styles.img}
        src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      <div className={styles.about} >
        <div>
          <div>
            <h3 className={styles.types_title}>Tipo:</h3>
            <div className={styles.types_container}>
              {pokemon.types.map((item, index) => (
                <span
                  key={index}
                  className={`${styles.type} ${styles['type_' + item.type.name]}`}
                >
                  {item.type.name}
                </span>
              ))}
            </div>
            <h2 className={styles.about_title}>Sobre</h2>
          </div>
          <div className={styles.data_container}>
            <div className={styles.data_height}>
              <h4>Altura</h4>
              <p>{pokemon.height * 10} cm</p>
            </div>
            <div className={styles.data_weight}>
              <h4>Peso</h4>
              <p>{pokemon.weight / 10} kg</p>
            </div>
          </div>
       <div className={styles.data_ability}>
       <h4>Habilidades</h4>
        {pokemon.abilities.map((ability,index) =>{

        return(
          <div className={styles.ability} key={index} >
        {ability.ability.name}

          </div>
        )
        
       } )}

       </div>

       



        </div>
      </div>
      </div>
      </div>
      <Footer/>
   </>
  )
}
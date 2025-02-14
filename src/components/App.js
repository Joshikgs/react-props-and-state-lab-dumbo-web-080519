import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentWillMount() {
    fetch("/api/pets")
    .then(res => res.json())
    .then(petArr => {
      this.setState({
        pets: petArr
      })
    })
  }

  onChangeType = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onFindPetsClick = () => {
    if(this.state.filters.type === "all"){
      fetch("/api/pets")
        .then(res => res.json())
        .then(petArr => {
          this.setState({
            pets: petArr
          })
        })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(res => res.json())
        .then(petArr => {
          this.setState({
            pets: petArr
          })
        })
    }
  }

  onAdoptPet = (id) => {
    const newPetArr = this.state.pets
    const currentPet = newPetArr.find(pet => pet.id === id)
    currentPet.isAdopted = true
    this.setState({
      pets: [...newPetArr]
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

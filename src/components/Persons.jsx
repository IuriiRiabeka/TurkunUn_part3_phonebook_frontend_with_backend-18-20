const Persons=({personsToShow,deletePerson})=>{
    return(
        <div>
             <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => (
          <div key={person.id}>{person.name} {person.number}
          <button onClick={() =>
           deletePerson(person.id, person.name)}>delete</button></div>
        ))}
      </div>
        </div>
    )
}
export default Persons;
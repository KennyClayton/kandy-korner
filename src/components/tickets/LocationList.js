import { useEffect, useState } from "react"; // don't know if i need to hook anything since I'm only displaying all the locations in this component
import "./Locations.css"
import { useNavigate } from "react-router-dom";

// I need to get a list of the locations. Where is that stored? On this project, it is stored in permanent state on a json server. I entered "json-server database.json -p 8088" into the terminal to open my resources links. I can use these links to fetch the data I need.
export const LocationList = () => {
  const [locations, setLocations] = useState([]); //using this hook to establish that the initial state for "locations" is an empty array AND so we can update that state/empty array. We will fill that empty array with all the locations objects from our database using the setLocations function (which is right next to the locations parameter above).
  //   const navigate = useNavigate(); //? importing because I need to have the functionality to navigate???/ or do i need this?

  // fetch all of the locations from json server...
  useEffect(
    () => {
      fetch(`http://localhost:8088/locations`) // this fetch retrieves all of the locations from permanent state...
        .then((response) => response.json()) // once we get the response, we have it converted back into an array for Javascript (ie - we parse the json into a JS array)
        .then((locationArray) => {
          //...then, using the parameter of "locationArray" (which is our entire list of locations just retrieved from the JSON server), we will run the setLocations function...
          setLocations(locationArray); //? what does the setTickets function do? It updates the value of the "locations" parameter, which is the array of locations now.
        });
    },
    [] // When this array is empty, you are observing initial component state
  );

  return (
    <>
      <h2>List of Locations</h2>
      <article className="locations">
        {locations.map((location) => {
          return <section className="location">
              <header>Address: {location.address}</header>
              <header>Square Footage: {location.sqFootage}</header>
            </section>
        })}
      </article>
    </>
  );
};

import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react"

//& Lines 6 - 22 and lines 40-42...I was trying to display the fullName of the currently logged-in user. Failed. Commented it out.
//I want to get access to the users database so I can display WHICH USER is logged in.
//Where is that stored? On this project, it is stored in permanent state on a json server. I entered "json-server database.json -p 8088" into the terminal to open my resources links. I can use these links to fetch the data I need.
// export const UserList = () => {
//   const [users, setUsers] = useState([]); // useState is a React hook that gives me "users" from my users database. But how? We aren't fetching any data here in this useState hook. So what does this do? This hook will give us two tools to work with. The setUsers function above will update the value of "users" variable above ONLY when I use the useEffect hook below. So useState is just a way to "tee up" for useEffect hook to be used. Because useEffect is where I will eventually call setUsers and pass the userArray as an argument. That is what fills up (updates) my "users" variable above. //*In short, useState([]) here is just setting the initial value of "users" as an empty array. BUT.....it also tees up useEffect hook so we can change "users" value to (in this case) the array of users.

//   useEffect(
//     () => {
//       fetch(`http://localhost:8088/users`) // this fetch retrieves all of the users from permanent state...
//         .then((response) => response.json()) // once we get the response, we have it converted back into an array for Javascript (ie - we parse the json into a JS array)
//         .then((userArray) => {
//           //...then, using the parameter of "userArray" (which is our entire list of users just retrieved from the JSON server), we will run the setUsers function...
//           setUsers(userArray); //? what does the setUsers function do? It updates the value of the "users" parameter, which is the array of locations now?
//         });
//     },
//     [] // When this array is empty, you are observing initial component state
//     //? So when exactly is my "users" variable on line 8 being updated?
//   )};


  export const NavBar = () => {
    const navigate = useNavigate();
    // we want to return a list of locations and we DO NOT need a ternary operator because the instructions say we want both employees and customers to see the list of locations...
    return (
      <ul className="navbar">
        <li className="navbar__item active">
          <Link className="navbar__link" to="/locations">
            Locations
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/routes">
            Learn About React Routes
          </Link>
        </li>
        {/* <li className="navbar__item active">
          Logged In As: {users.fullName}
        </li> */}
        <li className="navbar__item active">
          <Link className="navbar__link" to="/products">
            Products
          </Link>
        </li>
        {localStorage.getItem("kandy_user") ? (
          <li className="navbar__item navbar__logout">
            <Link
              className="navbar__link"
              to=""
              onClick={() => {
                //on a user's click of the logout button...
                localStorage.removeItem("kandy_user"); //...the user's local storage removes the kandy-user object...
                navigate("/", { replace: true }); //...and then the website goes back to the base route of the website/application with no user logged in???
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    );
  };

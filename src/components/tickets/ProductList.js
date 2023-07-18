import { useEffect, useState } from "react"; // don't know if i need to hook anything since I'm only displaying all the locations in this component
import "./Products.css"
import { useNavigate } from "react-router-dom";

// I need to get a list of the products. Where is that stored? On this project, it is stored in permanent state on a json server. I entered "json-server database.json -p 8088" into the terminal to open my resources links. I can use these links to fetch the data I need. //* the data I need is stored at url http://localhost:8088/products
//^ Create and export a function that will give me a list of all products
export const ProductList = () => {
    const [products, setProducts] = useState([]); //* useState gives me access to the products array of objects. It sets the initial state of my "products" variable to an empty array when I enter empty brackets in the useState() hook
    //We will replace the "products" variable with an array of products objects from our database (JSON server) by using the setProducts function which will run below in useEffect() hook.

    //^ Create another useState() that I can use to sort my products by name...and further down, we will create another useEffect hook that will update the sortedProducts but listed alphabeticlally by name
    const [sortedProducts, setSortedProducts] = useState([]); // this code gives me another variable to work with, and a corresponding function to update that variable.
    // Again, the initial state of sortedProducts is an empty array. And setSortedProducts will update the sortedProducts variable to a list of SORTED products. //? But how? 
    //* Use another useEffect to render a sorted list of products
    //? Does it matter if my second useEffect is below my first one, since the first useEffect is the one that fetched the data I need?

    const navigate = useNavigate()

    //^ get the user object data of the logged-in user....
    //? is that right?
    //^ Now store that user in localKandyUser variable as simple text from JSON server... 
    const localKandyUser = localStorage.getItem("kandy_user") //...get the kandy_user object out of local storage
    //^ ...then parse that json into a JS-usable object (which is the current user object)...
    const kandyUserObject = JSON.parse(localKandyUser) //...convert the string above into an object so we can use it in our code...this variable will be an object with two keys of "id" and "staff"
    //* now kandyUserObject is the current logged-in user's object

    //^ Fetch all of the products objects from json server at http://localhost:8088/products
    //* This lists ALL of the products, NOT sorted or filtered or anything
    useEffect(
        () => {
            fetch(`http://localhost:8088/products`) // this fetch retrieves all of the products from permanent state...
                .then((response) => response.json()) // once we get the response, we have it converted from simple text back into an array for Javascript (ie - we parse the json into a JS array)
                .then((productArray) => {
                    //...then, using the parameter of "productArray" (which is our entire list of products just retrieved from the JSON server), we will run the setProducts function...
                    setProducts(productArray); //...setProducts is called here and will update "products" variable on line 9 to the array of products objects
                });
        },
        [] // When this array is empty, you are observing initial component state
    );

    //^ Sort the products aphabetically
    //! But I only want this sorted version of the products to display for employees when an employee is logged in. Look at my return at the bottom for code...
    // ChatGPT gave this code and I updated it. Importantly, this was better than a vanilla JS piece of code because "...the React-specific approach offers more control and flexibility if you need to manage the state and sorting based on other components or events."
    //* This is an alphabetically sorted list of products
    useEffect(
        () => {
            // Sort the products by product name and update sortedProducts state
            setSortedProducts(
                [...products].sort((a, b) => a.name.localeCompare(b.name))
            );
        },
        [products]); //? this is not empty like it was on line 38. So is this observing the copy of the products array BEFORE it is sorted? is this kind of like passing an argument then?


// tried lines 56 - 67 to display only unsorted list of products for non-staff...and aplphabetically-ordered for staff members...
//     useEffect(  //?observe the log-in field...and...
//         () => {
//             if (kandyUserObject.isStaff) { // ...if the user logging in is a staff user...
//                 setSortedProducts(sortedProducts) //...then they can see products sorted alphabetically
//             }
//             else if(kandyUserObject.isStaff === false) {
//                 setProducts(products)
//         }
//     //? line 51 has [products] being watched? do I need to watch 
// },
//     []
//     )



//^Return something from this ProductList function. What do we return? HTML (or JSX really) of what we want displayed on the webpage. Instructions are to list all products, but have them sorted by product name with prices shown.
//? How do I only allow the sorted list to be displayed for user who's isStaff value is true? 
    //*Good question. When would our code check for whether a user is staff or not? Answer: at login. So we want to WATCH or OBSERVE the state of that login data being provided by the user. We do that with useEffect()

    //^ Create a useEffect() to observe the state of the products? or the log-in? And ONLY when an employee user is logged in, they can see the list of products sorted alphabetically. A customer should see an unsorted list of products.
return <>
{
    kandyUserObject.staff  // ternary statement: 
    ? //this question mark is like an if statement. So if the user is staff, display the alphabetically sorted list with the below jsx code by mapping over the sortedProducts array
    <>
        <h2>List of Products</h2>
        <article className="products">
            {
            sortedProducts.map(
                (product) => {
                    return <section className="product">
                        <header>{product.name} ${product.price}</header>
                        </section>
            })}
        </article>
    </>
    : //this colon means "otherwise, do this"...display products list by mapping over the products array
    <>
    <h2>List of Products</h2>
        <article className="products">
            {
            products.map( //? or do I need to keep this as sortedProducts.map?
                (product) => {
                    return <section className="product">
                        <header>{product.name}</header>
                        <header>${product.price}</header>
                        </section>
            })}
        </article>
    </>
}
</>
}
        



import React, { useEffect, useState } from "react";
import AllRooms from "../components/AllRooms";
// import {getListings} from "../api/index"
import Banner from "../components/Banner"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";

const url = "https://final-project-rama.herokuapp.com"
const getListings = async () => {
    const resp = await fetch(url  + "/api/listings");
    const listings = await resp.json()
    const newListings = []
    for(let listing of listings){
        const imagesResp = await fetch(url + '/api/images/' + listing.listing_id)
        var images = await imagesResp.json()
        images = images.map((img) => img.image_url)
        newListings.push({
            name: listing.listing_name,
            description: listing.listing_description,
            price: listing.price,
            id: listing.listing_id,
            images
        })
    }
    // console.log(newListings)
    return newListings

    
}


const Home = () => {

  const [listings, setListings] = useState([{
    "name": "Default Room 1",
    "description": "Default Room 1",
    "price": 102,
    "id": 1,
    images: ["https://media.timeout.com/images/105859033/image.jpg"]
  }])

  const [user, loading ] = useAuthState(auth);
  
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

  }, [user, loading]);

  const getAllListings = async () => {
    const allListings = await getListings()
    setListings(allListings)
  }
  useEffect(() => {
    getAllListings() 
  }, [])
  return (
    <>

        <Banner
        title="Prestige Worldwide"
        subtitle="Where luxury meets affordability"
        showLogout={true}
        >
        {/* <Link to="/rooms" className="btn-primary">
            our rooms
        </Link> */}
        {/* </Banner> */}
        </Banner>
        <AllRooms rooms={listings}/>
    </>
  );
};

export default Home;
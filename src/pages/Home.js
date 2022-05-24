import React, { useEffect, useState } from "react";
import AllRooms from "../components/AllRooms";
import {getListings} from "../api/index"
import Banner from "../components/Banner"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
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
import React, { useEffect, useState } from "react";
import AllRooms from "../components/AllRooms";
import {getListings} from "../api/index"
const Home = () => {

  const [listings, setListings] = useState([{
    "name": "Default Room 1",
    "description": "Default Room 1",
    "price": 102,
    "id": 1,
    images: ["https://media.timeout.com/images/105859033/image.jpg"]
  }])

  const getAllListings = async () => {
    const allListings = await getListings()
    setListings(allListings)
  }
  useEffect(() => {
    getAllListings()
  }, [])
  return (
    <>

        {/* <Banner
        title="luxurious rooms"
        subtitle="deluxe rooms starting at $299"
        > */}
        {/* <Link to="/rooms" className="btn-primary">
            our rooms
        </Link> */}
        {/* </Banner> */}
        <AllRooms rooms={listings}/>
    </>
  );
};

export default Home;
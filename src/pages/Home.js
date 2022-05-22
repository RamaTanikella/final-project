import React from "react";
import AllRooms from "../components/AllRooms";

// import Hero from "../components/Hero";
// import Banner from "../components/Banner";
// import Services from "../components/Services";
// import FeaturedRooms from "../components/FeaturedRooms";
const home = () => {
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
        <AllRooms rooms={[
            {
                "id":1,
                "name": "Room 1",
                "description": "Room 1 description",
                "images": ["https://media.timeout.com/images/105859033/image.jpg"],
                "price": 100
            },
            {
              "id":1,
              "name": "Room 1",
              "description": "Room 1 description",
              "images": ["https://media.timeout.com/images/105859033/image.jpg"],
              "price": 100
          },
          {
            "id":1,
            "name": "Room 1",
            "description": "Room 1 description",
            "images": ["https://media.timeout.com/images/105859033/image.jpg"],
            "price": 100
          },
          {
            "id":1,
            "name": "Room 1",
            "description": "Room 1 description",
            "images": ["https://media.timeout.com/images/105859033/image.jpg"],
            "price": 100
          }
        ]}/>
    </>
  );
};

export default home;
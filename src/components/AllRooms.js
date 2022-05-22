import React from "react";
// import Title from "./Title";
// import { RoomContext } from "../context";
import Room from "./Room";
// import Loading from "./Loading";

const AllRooms = ({rooms}) => {

    
    return (    
        <section className="featured-rooms">
            {/* <Title title="featured rooms" /> */}
            <div className="featured-rooms-center">
                {
                    rooms.map(room => {
                        return <Room key={room.id} room={room} />;
                    })
                }
            </div>
        </section>
        
    )
}

export default AllRooms
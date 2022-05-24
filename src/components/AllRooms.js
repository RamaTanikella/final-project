import React, {useState } from "react";
import Modal from "./Modal";
// import Title from "./Title";
// import { RoomContext } from "../context";
import Room from "./Room";
// import Loading from "./Loading";
export const allRoomsContext = React.createContext();
const AllRooms = ({rooms}) => {

     
    const [showModal, setModal] = useState(false)   
    const [whichRoom, setWhichRoom] = useState(1) 
    const [modalRef, setModalRef] = useState() 
    const [closeRef, setCloseRef] = useState() 
    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }  
    const onKeyDown = () => {

    }  
    const onClickOutside = () => {
        // 
    }  
    const closeModal = () => {
        setModal(false)
    }  
    return (    
        <allRoomsContext.Provider value={{showModal, setModal, whichRoom, setWhichRoom}}>
            <section className="featured-rooms">
                <div className="featured-rooms-center">
                    {
                        rooms.map(room => {
                            return <Room key={room.id} room={room} />;
                        })
                    }
                </div>
            </section>
            {
                showModal
                ?
                
                <Modal
                onSubmit={onSubmit}
                modalRef={(n) => setModalRef(n)}
                buttonRef={(n) => setCloseRef(n)}
                closeModal={closeModal}
                onKeyDown={onKeyDown}
                onClickOutside={onClickOutside}
                />
                : null
            }
        </allRoomsContext.Provider>
        
    )
}

export default AllRooms
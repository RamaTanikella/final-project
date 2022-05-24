import React, {useState } from "react";
import { addReservation } from "../api";
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
    const onSubmit = ({name, email, phone, inDate, outDate, listing_id}) => {
        if(name.trim().length == 0){
            alert("Please add a valid name")
        }
        else if(email.trim().length == 0){
            alert("Please add a valid email")
        }
        else if(phone.trim().length < 9){
            alert("Please add a valid phone number")
        }
        else if(inDate >= outDate){
            alert("Please select an end date for your reservation that is after your start date.")
        }
        else{

            var date = inDate
            while(date < outDate){
                addReservation({name, email, phone, date, listing_id: whichRoom})
                date.setDate(date.getDate() + 1);
            }
        }

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
import React, {useEffect, useState } from "react";
import { addReservation, getReservationsForId } from "../api";
import Modal from "./Modal";
import ReservationForm from "./ReservationForm";
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
    const [blackList, setBlackList] = useState([]) 

    // useEffect(() => {

    // }, [])
    const getAllReservationsForRoom = async () => {
        const r = await getReservationsForId(whichRoom)
        // alert("here")
        setBlackList(r) 
    }
    useEffect(() => {
        getAllReservationsForRoom()
    }, [whichRoom, showModal])
    const onSubmit = async ({name, email, phone, inDate, outDate, listing_id}) => {
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
            var count_good = 0
            var count_total = 0
            while(date < outDate){
                count_total += 1
                const resp = await addReservation({name, email, phone, date, listing_id: whichRoom})
                if(resp.listing_id){
                    count_good += 1
                }
                
                else{
                    alert("Could not create reservation")
                    break
                }
                console.log("Reservation Resp")
                console.log(resp)
                date.setDate(date.getDate() + 1);
            }
            if(count_good == count_total){
                alert("Reservation Created Succesfully");
                setModal(false)
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
        <allRoomsContext.Provider value={{showModal, setModal, whichRoom, setWhichRoom, blackList}}>
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
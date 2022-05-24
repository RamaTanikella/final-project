import React, {useEffect, useState } from "react";
import { addReservation, getReservationsForId } from "../api";
import Modal from "./Modal";

// import Title from "./Title";
// import { RoomContext } from "../context";
import Room from "./Room";
// import Loading from "./Loading";
export const allRoomsContext = React.createContext();

// const client = twilio.RequestClient()
// const client = require('twilio')(
    
// );
const AllRooms = ({rooms}) => {

     
    const [showModal, setModal] = useState(false)   
    const [whichRoom, setWhichRoom] = useState(1) 

    const [blackList, setBlackList] = useState([]) 

    // useEffect(() => {

    // }, [])
    const getAllReservationsForRoom = async () => {
        const r = await getReservationsForId(whichRoom)
        setBlackList(r) 
    }
    useEffect(() => {
        getAllReservationsForRoom()
    }, [whichRoom, showModal])
    const onSubmit = async ({name, email, phone, inDate, outDate, listing_id}) => {
        if(name.trim().length === 0){
            alert("Please add a valid name")
        }
        else if(email.trim().length === 0){
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
            if(count_good === count_total){
                const url = "https://final-project-rama.herokuapp.com"
                const sendMessageRequest = await fetch(url + "/sendMessage", {
                    method:"POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        phone,
                        message: "Thank you! Your reservation is confirmed for "+ 
                        (inDate.getMonth()+1) + "/"  + inDate.getDate() + "/" + inDate.getYear() + " to " + 
                        (outDate.getMonth()+1) + "/"  + outDate.getDate() + "/" + outDate.getYear() 

                    })
                })
                const resp = await sendMessageRequest.json()
                if(resp.status === "Good"){
                    alert("Reservation Created Succesfully. Please check your phone for a confirmation text.");
                    setModal(false)
                }
                else{
                    alert("Could not create reservation")
                }
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
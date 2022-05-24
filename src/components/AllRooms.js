import React, {useEffect, useState } from "react";
// import { addReservation } from "../api/index";
import Modal from "./Modal";

// import Title from "./Title";
// import { RoomContext } from "../context";
import Room from "./Room";
// import Loading from "./Loading";
export const allRoomsContext = React.createContext();

// const client = twilio.RequestClient()
// const client = require('twilio')(
    
// );
const url = "https://final-project-rama.herokuapp.com"
const addReservation = async ({name, email, phone, date, listing_id}) => {
    var month = date.getMonth()+1
    if( month < 10){
        month = "0" + month
    }
    const body  = {
        "listing_id": listing_id,
        "guest_name": name,
        "email": email,
        "in_date": date.getFullYear() + "-" + month + "-" + date.getDate()
    }
    // console.log("Request Body")
    // console.log(body)
    const addRequest = await fetch(url + "/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    const addResponse = await addRequest.json()
    return addResponse
    // console.log("Add Response")
    // console.log(addResponse)

}
const getReservationsForId = async (listing_id) => {
    const resp = await fetch(url  + "/api/reservations/"+ listing_id); 
    var reservations = await resp.json() 
    reservations=reservations.map((r) => {
        var d = new Date(r.in_date)
        d.setDate(d.getDate() + 1)
        return d
    })
    // alert(reservations)
    return reservations 

    
}
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
            while(date <= outDate){
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
                        message: "Thank you, your reservation is confirmed!"

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
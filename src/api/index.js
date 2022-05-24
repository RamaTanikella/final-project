
const url = "http://localhost:3000"
// const url = "https://final-project-rama.herokuapp.com"
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

const getReservationsForId = async (listing_id) => {
    const resp = await fetch(url  + "/api/reservations/"+ listing_id); 
    var reservations = await resp.json() 
    reservations=reservations.map((r) => new Date(r.in_date))
    // alert(reservations)
    return reservations 

    
}

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

module.exports = {
    getListings,
    addReservation, 
    getReservationsForId
}


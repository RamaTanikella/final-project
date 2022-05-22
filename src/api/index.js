

const getListings = async () => {
    const resp = await fetch("http://192.168.1.178:3000/api/listings");
    const listings = await resp.json()
    const newListings = []
    for(let listing of listings){
        const imagesResp = await fetch('http://192.168.1.178:3000/api/images/' + listing.listing_id)
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
    console.log(newListings)
    return newListings

    
}

module.exports = {
    getListings
}

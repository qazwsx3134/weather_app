const request = require('request')

const geocode = (address, callback) => {
    //encodeURIComponent是用來處理特殊字元的
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicWF6d3N4MzEzNCIsImEiOiJjazE2YTV0c3IxM2xqM2NuemtudW1ycm0wIn0.li2PS4AospwTQKMISZrJuA&limit=1'
  
    request({
        url : url,
        json : true,
  
      },
      (error, response) =>{
        if (error){
          callback('Unable to connect to location service!',undefined) //callback 如果有error 那麼error會被塞入string 
        }else if(response.body.features.length === 0 ){
          callback('Location not found!', undefined)
        }else{
          callback(undefined , {
            longtitude : response.body.features[0].center[0],
            latitude : response.body.features[0].center[1],
            location : response.body.features[0].place_name,
          })
        }
      })
  }
  
  module.exports = geocode
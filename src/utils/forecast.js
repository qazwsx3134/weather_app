const request = require('request')

const forecast = (longtitude,latitude, callback)=>{
    const url = "https://api.darksky.net/forecast/9ef1209a07611e048076b720c7470c1d/" + encodeURIComponent(longtitude)+','+encodeURIComponent(latitude) + "?units=si&lang=zh-tw"

    request({
        url : url,
        json : true,
        
    }, (error,response) =>{
        if(error){
            callback('Unable to connect to  weather service!',undefined)
        }else if (response.body.error){
            callback({
                        error : response.body.error,
                        code : response.body.code,
                    }
                        ,undefined)
        }else{
                // 若再object裡面啟動json true的話 那麼收到的response會自動json.parse
            // const data = JSON.parse(response.body);
            
            callback(undefined,
                response.body.daily.data[0].summary + ' It is currently '+ response.body.currently.temperature + ' degress out. This high today is '+ response.body.daily.data[0].temperatureHigh + ' with a low of '+ response.body.daily.data[0].temperatureLow + '. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
                
            
        }
    })
}
module.exports = forecast
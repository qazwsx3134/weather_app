const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //在Heroku上面抓取PORT 從process.env裡面抓 如果沒有數值就用3000(在local時候可以用)

//Define paths for Express config
//把public從這電腦的path設成一個變數
const publicDirectoryPath = path.join(__dirname, '../public')//=>C:\Users\USER\Desktop\programing_use\node\web-server\src
//View是預設的顯示資料夾 如果要更改路徑的話
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and view location
app.set('view engine', 'hbs')//設定handlebars as view engine
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


//http://localhost:3000/''
app.get('', (req, res)=>{
    //第一個變數是name of view to render 
    //第二個是object 包含所有的value 讓view可以access
    //render代表在views裡面的''.hbs
    res.render('index',{ 
        title: 'Index',
        name: 'Peter',
    })
})

////http://localhost:3000/'/about'
app.get('/about', (req, res)=>{
    //第一個變數是name of view to render 
    //第二個是object 包含所有的value 讓view可以access
    res.render('about',{ 
        title: 'About',
        name: 'Peter',
    })
})

//get method 第一個是物件 第二個是function funtion有兩個變數是必須的 請求跟回復

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Peter',
//         age: 24,
//     },{
//         name: 'Sarah',
//         age: 20,
//     }])
// })


app.get('/weather',(req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error : 'you must provide a address!'
        })
    }
    geocode(req.query.address, (error, {latitude,longtitude,location}={}) => {
        if(error){
          return res.send({
              error//return會停止程式繼續進行
            })
        }
        //緯度在前 經度在後
        forecast(latitude, longtitude, (error, forecastData) => {
          if(error){
            return res.send({
                error//return會停止程式繼續進行
              })
          }
          res.send({
              data :  forecastData,
              location,
              address : req.query.address,
            })
        })
      })

})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error : 'you must provide a search term!'
        })
    }
    console.log(req)
    res.send({
        product: [],
    })
})

app.get('/about/*', (req, res)=>{
    res.render('404',{
        title : '404',
        name: 'Peter',
        errorMessage: 'About article not found',
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title : '404',
        name: 'Peter',
        errorMessage: 'page not found',
    })
})

//架構
//app.com *Root
//app.com/help  *Route
//app.com/about
//app.com/weather
app.listen((port), () => { 
    console.log('Server is up on port '+ port)
    
})
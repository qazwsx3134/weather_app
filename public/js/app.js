console.log('Client side JS loaded');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    // console.log(response); => 會變成一堆拉里拉雜的readablestream要parse
    
    response.json().then((data)=>{
        console.log(data);
        
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')//若是以CSS來搜尋document.querySelector('.className')
const messageOne = document.querySelector('#message-1')//# 是以ID來搜尋
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e)=>{ //e = event
    e.preventDefault() //可以不重刷新網頁


    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'QQ'


    fetch('/weather?address=' + location ).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            typeof(data.error)
            console.log(data.error)
            
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.data
            console.log(data);
        }
    })
})
})
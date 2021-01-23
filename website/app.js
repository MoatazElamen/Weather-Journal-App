
/* Global Variables */
let appData = {}
const APIkey = 'c589c13d1efffcf9d33e82f631734c7c';
const generate =  document.getElementById('generate');
const feelings = document.querySelector('#feelings');

const cloudimg = 'http://openweathermap.org/img/w/'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
let url = `http://api.openweathermap.org/data/2.5/weather?`
let tmp = true
// async functions 

// posting the data to server side to store it as a most recent entry 
const postData = async (url='',data={})=>{
    const response = await fetch(url,{
        method:"POST",
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body:data,
    })
    // using try / catch to handle errors instead of app crashing 
    try {
        const resdata = await response.json();
        return resdata;
    }
    catch(error){
        console.log(error)
    }
}
// connecting to api using zip 
const getCurrentWeather = async (url='')=>{
    const response = await fetch(url)
    try {
        const data = response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
}

// fetching data from serverside 
const getData = async (url='')=>{
    const response = await fetch(url)
    try { 
        const data = await response.json();
        return data 
    }
    catch(err){
        console.log(err)
    }
}
// resets the Entries to make the ui looks cleaner
const clearEntry = ()=>{
    feelings.value = ''
    document.getElementById("zip").value = ''
}
// putting all app pieces togather in a chain 
const updateUI = (zip = '')=>{
    appData['date'] = newDate
    appData['content'] = feelings.value

    getCurrentWeather(`${url}zip=${zip}&appid=${APIkey}`)
    .then((data)=>{
      const toC  = Math.floor(data.main.temp - 273.15)
        appData['temp'] = toC,
        appData['icon'] = data.weather[0].icon
    })
    .then(()=>{
        console.log(appData)
        postData("http://localhost:8000",JSON.stringify(appData))
    })
    .then(()=>{
        getData("http://localhost:8000/mostrecent").then((data)=>{
            document.getElementById('date').innerText = data.date;
            document.getElementById('temp').innerHTML = `<span> ${data.temp}°<span> <img alt="cloudicon" src="${cloudimg}${data.icon}.png" />`
            document.getElementById('content').innerHTML = data.content
        })
    })
}
// getting the most recent Entry on window load
window.onload = (event) => {
    getData("http://localhost:8000/mostrecent").then((data)=>{
        document.getElementById('date').innerText = data.date;
        document.getElementById('temp').innerHTML = `<span> ${data.temp}°</span> <img alt="cloudicon" src="${cloudimg}${data.icon}.png" />`
        document.getElementById('content').innerHTML = data.content
        
    })
   
};

// event listeners 
generate.addEventListener('click',()=>{
    let zipinput =document.getElementById("zip").value
    
    updateUI(zipinput)
    clearEntry()
})
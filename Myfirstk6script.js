import { sleep } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data' //for loading csv or json data into array
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js' //csv param
import { check } from 'k6' //for text checks
import { scenario } from 'k6/execution'; //for unique selection of parameter

export const options = {
  scenarios: {
    Scenario_1: {
      executor: 'per-vu-iterations',
      gracefulStop: '5s',
      vus : 1,
      iterations : 3,
      maxDuration : '1m',
      exec: 'scenario_1',
    },
  },
}

//reading and loading data using papaparse for csv files
//const csvData = new SharedArray('Pages', function () {
    // Load CSV file and parse it using Papa Parse
   // return papaparse.parse(open('C:/Users/Savithadevi/Documents/Savitha/k6/Learnings/Sampletestdata.csv'), { header: true }).data;
 // });

 //reading and loading data using Json.parse for json files 
 const JsonData = new SharedArray('Pages', function () {
    // Load Json file and parse it using json.parse
   return JSON.parse(open('C:/Users/Savithadevi/Documents/Savitha/k6/Learnings/Sampletestdata.json')).Pages;
  });

export function scenario_1() {

    //random param code
  //  const randomPages = csvData[Math.floor(Math.random() * csvData.length)];
  //  console.log(csvData.length);
  //  console.log(randomPages);
 // console.log('Random Page: '+randomPages.Pages);

 //unique param code
 const Pages = JsonData[scenario.iterationInTest];
 console.log(`Pages is: ${JSON.stringify(Pages)}`);


  let response

  // MyfirstGetreq

  
  
  //

  response = http.get('https://test.k6.io/'+ Pages ,{
  headers: {
    Accept: 'text/html',
    'Content-Type': 'text/html',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
    
  },

})

    console.log(response.status)
    console.log(`Response Body: ${response.body}`);
 

  // Automatically added sleep
  sleep(1)
}



// export class Fetch {

//     public static async request( path: string, json: Object = {}, method: string = "POST") {

//         const response = await fetch(`${path}`, {
//             mode: 'cors',
//             method: method,
//             body: JSON.stringify(json),
//             headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},

//         });

//         return await response.json();

//     } 

// }


// (async () => {
//     const s = await Fetch.request(`https://m5dtgg-3000.csb.app/api/v1/items`, { });

//     console.log(s)
// })()

const browsers = [
    { name: 'Chrome', year: 2008 },
    { name: 'Firefox', year: 2004 },
    { name: 'Safari', year: 2003 },
    { name: 'Opera', year: 1996 },
    { name: 'IE', year: 1995 },
    { name: 'Edge', year: 2015 }
];

// console.log(browsers)
 

function moveElement(array: any[], fromIndex: any, toIndex: any) {
    const element = array.splice(fromIndex, 1)[0];
  
    console.log(element);
  
    array.splice(toIndex, 0, element);
  
    return array;
  }


// browsers.sort((x, y) => x.year - y.year).reverse();
// console.log(browsers);





console.log((1000 / 100) * 30)


// 

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
const { delimiter } = require('path');

const topic = "Business and Finance"
let no = 15

let fileName = topic + no + ".txt"

let urls = [

]


// async function getCourse(){

//     for(let i=1; i<2; i++)
//     {
//         let page = i
//         urls = []
//         const browser = await axios.get("https://www.brecorder.com/business-finance")
//         const $ = cheerio.load(browser["data"])
//         $("article").each((i, blog)=>{
//             const a = $(blog).find("h2>a").attr('href')
//             urls.push(a)
//         })
//         for (let i=6; i<20; i++)
//         {
//             try{
//             const response = await axios.get(urls[i])
//             const $ = cheerio.load(response["data"])
//             const title = "Title: " + $('h1:first>a').text()
//             console.log(title)
//             const article = $(".story__content>p").text().replace(/\s+/g,' ')
//             if(article.split(' ').length > 500)
//             {
//                 fs.appendFile(fileName,
//                     topic
//                     + "\n"
//                     +  title 
//                     + "\n" 
//                     + article
//                     , function (err) {
//                     if (err) throw err;
//                     console.log('Saved!');
//                 });
//                 no = no + 1
//                 fileName = topic + no + ".txt"
//             }
//             else{
//                 console.log("Less Than 500")
//             }
//         }
//         catch(err)
//         {
//             console.log("Error")
//         }
//         }
//     }

    
// };

    
// async function getCourse(){
//     for (let i=0; i<urls.length; i++)
//     {
//         const response = await axios.get(urls[i])
//         const $ = cheerio.load(response["data"])
//         const title = "Title: " + $('h1:first').text()
        
//         const article = $(".article-body__content>p").text().replace(/\s+/g,' ')
//         if(article.split(' ').length > 500)
//         {
//             fs.appendFile(fileName,
//                 topic
//                 + "\n"
//                 +  title 
//                 + "\n" 
//                 + article
//                 , function (err) {
//                 if (err) throw err;
//                 console.log('Saved!');
//             });
//             no = no + 1
//             fileName = topic + no + ".txt"
//         }
//         else{
//             console.log("Less Than 500")
//         }
// }
// };







async function getCourse(){
        urls = []
        const browser = await axios.get("https://markets.businessinsider.com")
        const $ = cheerio.load(browser["data"])
        $(".instrument-stories__story").each((i, blog)=>{
            const a = $(blog).find("a").attr('href')
            urls.push(a)
        })
        console.log(urls)
        for (let i=0; i<urls.length - 1; i++)
        {
            try{
            const response = await axios.get("https://markets.businessinsider.com" + urls[i])
            const $ = cheerio.load(response["data"])
            const title = "Title: " + $('h1:first').text()
            console.log(title)
            const article = $(".content-lock-content>p").text().replace(/\s+/g,' ')
            if(article.split(' ').length > 0)
            {
                fs.appendFile(fileName,
                    topic
                    + "\n"
                    +  title 
                    + "\n" 
                    + article
                    , function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                    console.log(article.split(' ').length)
                });
                no = no + 1
                fileName = topic + no + ".txt"
            }
            else{
                console.log("Less Than 500")
            }
        }
        catch(err)
        {
            console.log("Error")
        }
        }    
};
getCourse()



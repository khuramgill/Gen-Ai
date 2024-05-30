const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

const topic = "Food"
let no = 1

let fileName = topic + no + ".txt"

let urls = []

async function getData(){

    for(let i=1; i<4; i++)
    {
        let page = i
        urls = []
        const browser = await axios.get("https://artofhealthyliving.com/category/diets/page/"+ page)
        const $ = cheerio.load(browser["data"])
        $("article").each((i, blog)=>{
            const a = $(blog).find("h2>a").attr('href')
            urls.push(a)
        })

        
        for (let i=0; i<5; i++)
        {
            const response = await axios.get(urls[i])
            const $ = cheerio.load(response["data"])
            const title = "Title: " + $('.entry-title:first').text()
            
            const article = $("article").text().replace(/\s+/g,' ')
            if(article.split(' ').length > 500)
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
                });
                no = no + 1
                fileName = topic + no + ".txt"
            }
            else{
                console.log("Less Than 500")
            }
        }
    }

    
};
getData()



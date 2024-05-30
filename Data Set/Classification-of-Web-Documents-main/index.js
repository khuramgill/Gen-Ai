const axios = require('axios')
const cheerio = require('cheerio')
let converter = require('json-2-csv');
const fs = require('fs');
const { delimiter } = require('path');

const url = [
    "https://artofhealthyliving.com/8-ways-to-improve-patient-care-quality/"
]
const topic = "Health and Fitness"
let no = 15

let fileName = topic + no + ".txt"

const courseData = {}

async function getCourse(){
    for (let i=0; i<url.length; i++)
    {
        const response = await axios.get(url[i])
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
};
getCourse()



//Datos de la website 

const puppeteer = require('puppeteer');
let jobsWebsite = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    async function getWebsiteData() {         
        await page.goto('https://www.arrivia.com/careers/job-openings/', {waitUntil: 'networkidle2'});
 
        const dataWebsiteJobs = await page.evaluate(() => {
            const totalJobs = document.querySelectorAll('.job-search-result');
            const dataJobs = [];
            totalJobs.forEach((job)=>{
                dataJobs.push({
                    title: job.querySelector('h3').textContent,
                    location: job.querySelector('p').textContent,
                    url: job.querySelector('.btn-job-apply').getAttribute('href')
                })
            })
            return {
               jobs: dataJobs
            }
        })
        jobsWebsite = [...dataWebsiteJobs.jobs]
        console.log(dataWebsiteJobs)
    }
    
    getWebsiteData();
    setTimeout(()=>{
        console.log("funciono");
        console.log(jobsWebsite);
    }, 15000);
    //await browser.close();

})();


//servidor local

const express = require('express');
const app = express();

app.set('port', 8080);

app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.render('index', {
        name: 'Ricardo Andres Diaz Reyes',
    })
});

app.listen(app.get('port'), ()=>{
    console.log('servidor iniciado');
});




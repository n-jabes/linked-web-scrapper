import axios from 'axios';
import cheerio from 'cheerio';
import ObjectsToCsv from 'objects-to-csv';

import { html } from 'cheerio';


for (let pageNumber = 0; pageNumber < 600; pageNumber += 25) {

    let url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=email%2Bdeveloper&amp;amp;amp;location=United%2BStates&amp;amp;amp;geoId=103644278&amp;amp;amp;trk=public_jobs_jobs-search-bar_search-submit&amp;amp;amp;currentJobId=2931031787&amp;amp;amp;position=1&amp;amp;amp;pageNum=0&amp;amp;amp;start=${pageNumber}`


    const linkedinJobs = [];

    axios(url).then (response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const jobs = $('li');

        jobs.each((index, element) => {
            const jobTitle = $(element).find('h3.base-search-card__title').text().trim()
            const company = $(element).find('h4.base-search-card__subtitle').text().trim()
            const location = $(element).find('span.job-search-card__location').text().trim()
            const link = $(element).find('a.base-card__full-link').attr('href')
            linkedinJobs.push({'Title': jobTitle,'Company': company,'Location': location,'Link': link})

        })
        console.log(linkedinJobs)
        const csv = new ObjectsToCsv(linkedinJobs)
        csv.toDisk('./linkedInJobs.csv', { append: true })
    })
}
// We works with Node.js Workers, to lunch the threads
import { parentPort } from "worker_threads";

// Cheerio - we use it to scrapp our data

import $ from "cheerio";
// request-promise - we need it to be able working with cheerio

import rp from "request-promise";
// Model - we need a Clients model to save all the scraping data

import Clients from "./models/client";
// Mongoose - helps us works with MongoDB 

import mongoose from "mongoose";

// dotenv - you need it to setting your dev environment
require("dotenv").config();

// DB connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,

    useFindAndModify: false,
  })
  .then(() => console.log("Db is connected!"))
  .catch((err) => console.log(err));

// Lounch threads
parentPort.on("message", (nextId) => {

 // Call our scrapEngine
 ScraperEngine(nextId)
  .then((owner) => {
    //Post message to our worker that some of threads done
    parentPort.postMessage({status: 'OK', payload: owner});
  })
  .catch((err) => { 
    console.error(err)
  })

});


// ScraperEngine

function ScraperEngine(nextId) {

    // Call request promise - use your link
    return rp(`youLink${nextId}`)
      .then(async function (html) {
        try {
          let clientUrl = `yourLink${nextId}`;
          // Call scraper 
          let client = scrappingData(html, clientUrl);

          // Validate some items when we can't find useful info
          let { name, companyName } = client;
          if(companyName !== '') {
            let ownerIsExist = await Clients.findOne({ name });
            if (ownerIsExist) {
              console.log("This owner is already exist");
            } else {
              // Save data in MongoDB
              let newOwner = new Clients(client);
              newOwner.save();

              return client;
            }
          } else {
            console.log('Page is empty');
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(function (err) {
        console.log(err.message);
        throw err;
      });
  }
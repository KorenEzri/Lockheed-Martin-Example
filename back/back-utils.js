//GET ALL URLS - DEFAULT BIN :)
const base_url = "https://localhost:3000";
const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

const readFileInSystem = (location) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./back/${location}.json`, (err, allUsers) => {
      if (err) {
        console.log(err.message);
      }

      allUsers = allUsers.toString("utf8");
      resolve([allUsers]);
    });
  });
};

const addUser = (location, userObject) => {
  readFileInSystem(location).then((allUsers) => {
    allUsers.push(userObject);
    fs.writeFile(`./back/${location}.json`, `${allUsers}`, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });
};

const tempArr = [];
const logKey = async (location, key) => {
  console.log(tempArr);
  allLogs = [];
  allLogs.push(key);
  allLogs.forEach((obj) => {
    tempArr.push(obj);
  });
  fs.writeFile(`./back/${location}.json`, `${tempArr}`, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  // });
};

const scrapeWebsite =async  () => {
let finalRes;
  await (async () => {

    const config = {
        baseSiteUrl: `http://localhost:3000/views/lockheed.html`,
        startUrl: `http://localhost:3000/views/lockheed.html`,
        filePath: './scrapes/',
        concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
        maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
        logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
    }
    

    const scraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.

    //Now we create the "operations" we need:

    const root = new Root();//The root object fetches the startUrl, and starts the process.  
   
    const details = new CollectContent('summary');//"Collects" the text from each H1 element.

    root.addOperation(details);//Then we create a scraping "tree":
      details.getData() ;
    await scraper.scrape(root);

    //If you just want to get the stories, do the same with the "story" variable:
    const deets = details.getData();
    fs.writeFile('./back/details.json', JSON.stringify(deets), () => { })//Will produce a formatted JSON containing all article pages and their selected data.

    // fs.writeFile('./stories.json', JSON.stringify(stories), () => { })
    finalRes = deets

})();    
return finalRes
}

module.exports = {
  readFileInSystem,
  addUser,
  logKey,
  tempArr,
  scrapeWebsite,
};

const request = require('request');
const cheerio = require('cheerio');

//Scrapes data from https://www.aasf.org/meetings?tsml-day=any&tsml-region=235 SF only meetings

exports.scraper = function(url){
    return new Promise(function(resolve, reject){
        request(url, function(err, resp, body){
            if(err){
                reject(err);
            }
            let $ = cheerio.load(body);
            let numRows = $('#meetings_tbody').find('tr').length;
            let groupName = 'Alchoholics Anonymous', groupAcronym = 'AA';
            let city;
            let allData = [];
            
            $('tr').each(function(i, row){
                let day, time, meetingName, locationName, state,
                    address, room, region, zip, county,
                    contact, phone, language, contactUrl, meetingUrl, localWebsite;
                let details = [], notes = [], geo = []; 
                let meetingObj = {};

                day = $('td.time span:first-child').eq(i).text().trim();
                time = $('td.time span:last-child').eq(i).text().trim();
                region = $('td.region').eq(i).text().trim();
                meetingName = $('td.name').eq(i).text().trim();
                address = $('td.address').eq(i).text().trim();
                locationName = $('td.location').eq(i).text().trim();
                meetingUrl = $('td.name a').eq(i).attr('href')
                details = $('td.types').eq(i).text().split(',').map(function(item){
                    return item.trim();
                });
                //site specific logic because of data inconsistencies
                if(locationName === "St Finn Barr's Church"){
                    address = '415 Edna St';
                    zip = '94112';
                }
                if(time === 'Noon'){
                    time = '12:00 pm';
                }
                //hardcoded items
                localWebsite = 'https://www.aasf.org/';
                state = 'CA';
                phone = '415-674-1821';
                city = 'San Francisco';

                meetingObj = {
                    groupName: groupName,
                    groupAcronym: groupAcronym,
                    day: day,
                    time: time,
                    meetingName: meetingName,
                    room: room,
                    contact: contact,
                    phone: phone,
                    language: language,
                    contactUrl: contactUrl,
                    meetingUrl: meetingUrl,
                    localWebsite: localWebsite,
                    details: details,
                    notes: notes,
                    loc: {
                        locationName: locationName,
                        address: address,
                        region: region,
                        city: city,
                        state: state,
                        zip: zip,
                        county: county,
                        geo: geo
                    }
                };

                if(meetingObj.day.length > 0 && meetingObj.meetingName.length > 0 ){
                    allData.push(meetingObj);
                }
                
            });            
            resolve(allData);
        })
    })
  
}


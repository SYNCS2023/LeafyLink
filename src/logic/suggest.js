import plantData from './plantData.json' assert { type: 'json' };

function getClimateData(latitude, longitude) {
  return fetch(
    'http://climateapi.scottpinkelman.com/api/v1/location/' +
      latitude +
      '/' +
      longitude
  );
}

function spaceAvailable(spaceReq, property) {
    if (spaceReq === "L") {
        if (property === "house") return true;
    } else if (spaceReq === "M") {
        if (property === "apartment") return true;
    } else { // "S"
        if (property === "house" || property === "apartment" || property === "room" || property === "caravan") return true;
    }
    return false;
}

function distanceHarvestTime(plant, time) {
    const harvestTime = plant.harvest_time;
    let midTime = 0;

    // via exp dist

    // param tuning
    if (time === ">1") {
        if (harvestTime <= 1) {
            return 7;
        }

        midTime = 1;
    } else if (time === "1-3") {
        if (harvestTime > 1 && harvestTime <= 3) {
            return 7;
        }
        
        midTime = 3;
    } else if (time === "3-6") {
        if (harvestTime > 3 && harvestTime <= 6) {
            return 7;
        }

        midTime = 6;
    } else if (time === "6-12") {
        if (harvestTime > 6 && harvestTime <= 12) {
            return 7;
        }

        midTime = 12;
    } else { // 12+
        if (harvestTime > 12) {
            return 7;
        }
        time = 12;
    }

    return 7 - 4 * Math.log(Math.abs(harvestTime - midTime));
}

function getSeasonalLightConditions(latitude) {
    if (latitude <= 40 && latitude >= -40) {
        return "full";
    }

    const month = (new Date()).getMonth();
    let isSummer = false;
    if (latitude >= 0) { // northern
        if (month >= 3 && month <= 8) isSummer = true;
    } else { // southern
        if (month >= 8 || month <= 2) {
            isSummer = true;
        }
    }

    if (latitude > 40 && latitude <= 90) { // north
        if (isSummer) {
            return "full";
        } else { // winter
            if (latitude <= 50) {
                return "full";
            } else if (latitude <= 60) {
                return "partial";
            } else {
                return "shade";
            }
        }
    } else if (latitude < -40 && latitude >= -90) { // south
        if (isSummer) { 
            return "full";
        } else { // winter
            if (latitude >= -50) {
                return "full";
            } else if (latitude >= -60) {
                return "partial";
            } else {
                return "shade";
            }
        }
    }
}

async function suggestPlants(budget, location, property, time, potted) {
    const suggestions = [];
    const locc = (await getClimateData(location.latitude, location.longitude)).json();
    const resJSON = await locc;
    const kgz_1User = resJSON.return_values[0].koppen_geiger_zone.slice(0,1);

    console.log("Ordered suggestions for input of: " + location.latitude + " " + location.longitude + " " + property + " " + time + " " + potted);

    // param tuning
    for (let [key, value] of Object.entries(plantData.data)) {
        if (spaceAvailable(value.space_req, property)) {
            let index = suggestions.push({name: value.name, score: 0}) - 1;
            if (value.kgz_1.includes(kgz_1User)) {
                suggestions[index].score = suggestions[index].score + 3;
            }

            if (potted === "pot") {
                if (value.pots) {
                    suggestions[index].score = suggestions[index].score + 5;
                }
            } else { // ground
                if (value.garden) {
                    suggestions[index].score = suggestions[index].score + 5;
                }
            }

            const seasonalLight = getSeasonalLightConditions(location.latitude);
            if (value.light_level.includes(seasonalLight)) {
                if (potted === "ground") {
                    suggestions[index].score = suggestions[index].score + 5;
                } else { // potted
                    suggestions[index].score = suggestions[index].score + 2;
                }
            }

            suggestions[index].score = suggestions[index].score + distanceHarvestTime(value, time);   
        }
    }

    if (suggestions.length == 0) return suggestions;

    suggestions.sort(function (a, b) {
        return b.score - a.score;
    });

    const max = suggestions[0].score;
    const suggestionsMax = suggestions.filter(function (s) {
        return s.score === max;
    });

    if (suggestionsMax.length >= 3) {
        const shuffledMax = suggestionsMax.sort(() => 0.5 - Math.random());
        return shuffledMax.slice(0, 3);
    } else if (suggestions.length >= 3) {
        return suggestions.slice(0, 3);
    } else {
        return suggestions;
    }
}
    

// console.log(suggestPlants());
// console.log(await suggestPlants(0, {latitude: -33.865143, longitude: 151.209900}, "apartment", 5, pot));
// console.log(await suggestPlants(0, {latitude: -33.865143, longitude: 151.209900}, "house", 5, pot));
// console.log(
//     await suggestPlants(
//         0,
//         { latitude: -33.865143, longitude: 151.2099 },
//         'house',
//         5,
//         "pot"
//     )
// );

// console.log(
//     await suggestPlants(
//         0,
//         { latitude: -33.865143, longitude: 151.2099 },
//         'house',
//         5,
//         "ground"
//     )
//   );

// console.log((new Date()).getMonth());

export default suggestPlants;

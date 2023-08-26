import plantData from "./plantData.json" assert { type: 'json' };

function getClimateData(lattitude, longitude) {
    return fetch("http://climateapi.scottpinkelman.com/api/v1/location/" + lattitude + "/" + longitude);
}

function spaceAvailable(spaceReq, property) {
    if (spaceReq === "L") {
        if (property === "House") return true;
    } else if (spaceReq === "M") {
        if (property === "House") return true;
    } else { // "S"
        if (property === "House" || property === "Apartment" || property === "Single Room" || property === "Caravan") return true;
    }
    return false;
}

async function suggestPlants(budget, location, property, time, potted) {
    const suggestions = [];
    const locc = (await getClimateData(location.latitude, location.longitude)).json();
    const resJSON = await locc;
    const kgz_1User = resJSON.return_values[0].koppen_geiger_zone.slice(0,1);

    console.log("Ordered suggestions for input of: " + location.latitude + " " + location.longitude + " " + property + " " + time + " " + (potted ? "pot" : "garden"));

    for (let [key, value] of Object.entries(plantData.data)) {
        if (spaceAvailable(value.space_req, property)) {
            let index = suggestions.push({name: value.name, score: 0}) - 1;
            if (value.kgz_1.includes(kgz_1User)) {
                suggestions[index].score = suggestions[index].score + 5;
            }
            if (potted) {
                if (value.pots) {
                    suggestions[index].score = suggestions[index].score + 3;
                }
            } else {
                if (value.garden) {
                    suggestions[index].score = suggestions[index].score + 3;
                }
            }
        }
    }

    if (suggestions.length == 0) return suggestions;

    suggestions.sort(function(a, b) {return b.score - a.score});

    const max = suggestions[0].score;

    const suggestionsMax = suggestions.filter(function(s) {return s.score === max});
    if (suggestions.length >= 3 && suggestionsMax.length >= 3) {
        const shuffledMax = suggestionsMax.sort(() => 0.5 - Math.random());
        return shuffledMax.slice(0, 3);
    } else {
        return suggestions;
    }
}

// console.log(suggestPlants());
// console.log(await suggestPlants(0, {latitude: -33.865143, longitude: 151.209900}, "Apartment", 5, true));
// console.log(await suggestPlants(0, {latitude: -33.865143, longitude: 151.209900}, "House", 5, true));
console.log(await suggestPlants(0, {latitude: -33.865143, longitude: 151.209900}, "House", 5, false));
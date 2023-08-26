import plantData from './plantData.json' assert { type: 'json' };

async function getClimateData(latitude, longitude) {
  let response;
  try {
    response = await fetch(
      'https://climateapi.scottpinkelman.com/api/v1/location/' +
        latitude +
        '/' +
        longitude
    ) 
  } catch (err) {
    response = {"request_values":{"lat":-33.8715,"lon":151.2006},"return_values":[{"lat":-33.75,"lon":151.25,"koppen_geiger_zone":"Cfa","zone_description":"Humid subtropical, no dry season"}]}
  }

  if (response.ok) {
    return response.json();
  } else {
    return response;
  }
}

function spaceAvailable(spaceReq, property) {
  if (spaceReq === 'L') {
    if (property === 'house') return true;
  } else if (spaceReq === 'M') {
    if (property === 'apartment' || property === 'house') return true;
  } else {
    // "S"
    if (
      property === 'house' ||
      property === 'apartment' ||
      property === 'room' ||
      property === 'caravan'
    )
      return true;
  }
  return false;
}

function distanceDifficulty(plant, time) {
  const diff = plant.diff;
  const factor = 2;
  let uLvl = 1.5;
  if (time === '>1') {
    if (diff <= 1) {
      return 5 / factor;
    }
    uLvl = 1;
  } else if (time === '1-3') {
    if (diff <= 2) {
      return 5 / factor;
    }
    uLvl = 1.5;
  } else if (time === '3-6') {
    if (diff === 2) {
      return 5 / factor;
    }
    uLvl = 2;
  } else if (time === '6-12') {
    if (diff === 3 || diff === 4) {
      return 5 / factor;
    }
    uLvl = 3;
  } else {
    // 12+
    if (diff === 4) {
      return 5 / factor;
    }
    uLvl = 4;
  }

  return 5 - Math.abs(diff - uLvl);
}

function distanceHarvestTime(plant, time) {
  const harvestTime = plant.harvest_time;
  let midTime = 0;
  const factor = 2;

  // via exp dist

  // param tuning
  if (time === '>1') {
    if (harvestTime <= 1) {
      return 5 / factor;
    }

    midTime = 1;
  } else if (time === '1-3') {
    if (harvestTime > 1 && harvestTime <= 3) {
      return 5 / factor;
    }

    midTime = 3;
  } else if (time === '3-6') {
    if (harvestTime > 3 && harvestTime <= 6) {
      return 5 / factor;
    }

    midTime = 6;
  } else if (time === '6-12') {
    if (harvestTime > 6 && harvestTime <= 12) {
      return 5 / factor;
    }

    midTime = 12;
  } else {
    // 12+
    if (harvestTime > 12) {
      return 5 / factor;
    }
  }

  return (5 - 2.5 * Math.log(Math.abs(harvestTime - midTime))) / factor;
}

function priceWeighting(plant, budget) {
  const price = plant.price;
  const pool = parseInt(budget);

  if (price < budget * 1.1) {
    return 5;
  } else {
    return pool - price;
  }
}

function getSeasonalLightConditions(latitude) {
  if (latitude <= 40 && latitude >= -40) {
    return 'full';
  }

  const month = new Date().getMonth();
  let isSummer = false;
  if (latitude >= 0) {
    // northern
    if (month >= 3 && month <= 8) isSummer = true;
  } else {
    // southern
    if (month >= 8 || month <= 2) {
      isSummer = true;
    }
  }

  if (latitude > 40 && latitude <= 90) {
    // north
    if (isSummer) {
      return 'full';
    } else {
      // winter
      if (latitude <= 50) {
        return 'full';
      } else if (latitude <= 60) {
        return 'partial';
      } else {
        return 'shade';
      }
    }
  } else if (latitude < -40 && latitude >= -90) {
    // south
    if (isSummer) {
      return 'full';
    } else {
      // winter
      if (latitude >= -50) {
        return 'full';
      } else if (latitude >= -60) {
        return 'partial';
      } else {
        return 'shade';
      }
    }
  }
}

async function suggestPlants(budget, location, property, time, potted) {
  const suggestions = [];
  const locc = (
    await getClimateData(location.latitude, location.longitude)
  );
  const resJSON = await locc;
  const kgz_1User = resJSON.return_values[0].koppen_geiger_zone.slice(0, 1);

  console.log(
    'Ordered suggestions for input of: ' +
      location.latitude +
      ' ' +
      location.longitude +
      ' ' +
      property +
      ' ' +
      time +
      ' ' +
      potted
  );

  // param tuning
  for (let [key, value] of Object.entries(plantData.data)) {
    if (spaceAvailable(value.space_req, property)) {
      let index = suggestions.push({ name: value.name, score: 0 }) - 1;
      if (value.kgz_1.includes(kgz_1User)) {
        suggestions[index].score = suggestions[index].score + 3;
      }

      if (potted === 'pot') {
        if (value.pots) {
          suggestions[index].score = suggestions[index].score + 5;
        }
      } else {
        // ground
        if (value.garden) {
          suggestions[index].score = suggestions[index].score + 5;
        }
      }

      const seasonalLight = getSeasonalLightConditions(location.latitude);
      if (value.light_level.includes(seasonalLight)) {
        if (potted === 'ground') {
          suggestions[index].score = suggestions[index].score + 4;
        } else {
          // potted
          suggestions[index].score = suggestions[index].score + 1;
        }
      }

      suggestions[index].score =
        suggestions[index].score + distanceHarvestTime(value, time);
      suggestions[index].score =
        suggestions[index].score + distanceDifficulty(value, time);
      suggestions[index].score =
        suggestions[index].score + priceWeighting(value, budget);
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

// console.log(
//     await suggestPlants(
//         10,
//         { latitude: -30.607830902, longitude: 130.407831702 },
//         'caravan',
//         "3-6",
//         "pot"
//     )
// );

// console.log(
//     await suggestPlants(
//         5,
//         { latitude: -30.607830902, longitude: 130.407831702 },
//         'room',
//         ">1",
//         "pot"
//     )
// );

// console.log(
//     await suggestPlants(
//         50,
//         { latitude: -30.607830902, longitude: 130.407831702 },
//         'house',
//         "12+",
//         "pot"
//     )
// );

// console.log(
//     await suggestPlants(
//         100,
//         { latitude: -27.46794000, longitude: 153.02809000 },
//         'house',
//         "12+",
//         "ground"
//     )
// );

// console.log((new Date()).getMonth());

export default suggestPlants;

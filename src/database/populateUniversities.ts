import axios from "axios";

// Populate the database with universities

async function populateUniversities() {
  
    const countrys = [
        "brazil", 
        "argentina",
        "chile",
        "colombia",
        "peru",
        "paraguay",
        "uruguay",
        "suriname"
    ]

    let arry = [];
    for (let i = 0; i < countrys.length; i++) {
        const country = countrys[i];
        const url = `http://universities.hipolabs.com/search?country=${country}`;
        const response = await axios.get(url);
        const universities = response.data;

        for (let j = 0; j < universities.length; j++) {
            arry.push(universities[j]);
        }
    }


    return arry;
}

export default populateUniversities;
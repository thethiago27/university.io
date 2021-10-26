const { ObjectId } = require("mongodb");
const mongo = require("../database/mongo");
const {capitalize, paginate} = require("../utils/capitalize")

// GET /universities?page=1&country=Brazil
// Returns all universities

async function getAllUniversities(request, response) {

    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { page, country } = request.query;

    if(country) {
        const universities = await collection
        .find({country: capitalize(country)})
        .project({ "_id": 1, "name": 1, "state-province": 1})
        .toArray();

        const paginatedUniversities = paginate(universities, page, 20);

        return response.status(200).json(paginatedUniversities);
    }

    const universities = await collection
    .find({})
    .project({ "_id": 1, "name": 1, "state-province": 1, "country": 1})
    .toArray();

    const paginatedUniversities = paginate(universities, page, 20);

    return response.status(200).json(paginatedUniversities);
}

// Find universities by id

async function getUniversityById(request, response) {
    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { id } = request.params;

    console.log(id)
    
    const university = await collection.find(ObjectId(id)).toArray();
    
    return response.status(200).json(university);
}

// Delete a university

async function deleteUniversity(request, response) {
    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { id } = request.params;

    await collection.deleteOne({_id: ObjectId(id)});

    return response.status(200).json({message: "University deleted successfully"});
}

// Update a university

async function updateUniversity(request, response) {

    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { id } = request.params;

    const { web_pages, name, domains } = request.body;

    await collection.updateOne({_id: ObjectId(id)}, {$set: {web_pages, name, domains}});    

    return response.status(200).json({message: "University updated successfully"});
}

// Create a university

async function createUniversity(request, response) {
    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { name, country, state_province, alpha_two_code, web_pages, domains } = request.body;

    const filterMaxCharacteres = alpha_two_code.length > 2;

    if(filterMaxCharacteres) return response.status(400).json({message: "The alpha_two_code must have 2 characters"});

    const isExist = await collection.findOne({name, country, "state-province": state_province});

    if(isExist) {
        return response.status(400).json({error: "University already exists"});
    }

    const university = await collection.insertOne({
        name, 
        country,
        alpha_two_code,
        web_pages,
        domains,
        "state-province": state_province
    })

    return response.status(201).json(university);
}


module.exports = { getAllUniversities, getUniversityById, createUniversity, deleteUniversity, updateUniversity}
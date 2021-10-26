import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { capitalize, paginate } from "../utils/capitalize";
import mongo from "../database/mongo";

// GET /universities?page=1&country=Brazil
// Returns all universities

export async function getAllUniversities(request: Request, response: Response) {

    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { page, country } = request.query;

    if(country) {
        const universities = await collection
        .find({country: capitalize(String(country))})
        .project({ "_id": 1, "name": 1, "state-province": 1})
        .toArray();

        const paginatedUniversities = paginate(universities, Number(page), 20);

        return response.status(200).json(paginatedUniversities);
    }

    const universities = await collection
    .find({})
    .project({ "_id": 1, "name": 1, "state-province": 1, "country": 1})
    .toArray();

    const paginatedUniversities = paginate(universities, Number(page), 20);

    return response.status(200).json(paginatedUniversities);
}

// Find universities by id

export async function getUniversityById(request: Request, response: Response) {
    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { id } = request.params;

    console.log(id)
    
    const university = await collection.find(new ObjectId(id)).toArray();
    
    return response.status(200).json(university);
}

// Delete a university

export async function deleteUniversity(request: Request, response: Response) {
    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { id } = request.params;

    await collection.deleteOne({_id: new ObjectId(id)});

    return response.status(200).json({message: "University deleted successfully"});
}

// Update a university

export async function updateUniversity(request: Request, response: Response) {

    const conn = await mongo.connection()
    const collection = conn.collection("universities");

    const { id } = request.params;

    const { web_pages, name, domains } = request.body;

    await collection.updateOne({_id: new ObjectId(id)}, {$set: {web_pages, name, domains}});    

    return response.status(200).json({message: "University updated successfully"});
}

// Create a university

export async function createUniversity(request: Request, response: Response) {
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
import db from "../db.js";

export async function getGames(req, res) {

    const {name} = req.query;

    try{
        if(!name){
            const {rows: games}=await db.query(`
               SELECT games.*, categories.name as "categoryName"
               FROM games
               JOIN categories ON games."categoryId"=categories.id
            `);
            res.send(games);
        }
        else{
            const {rows: games}= await db.query(`
                SELECT games.*, categories.name as "categoryName"
                FROM games
                JOIN categories ON games."categoryId"=categories.id
                WHERE LOWER(games.name) LIKE LOWER($1)
            `, [`${name}%`]);
            res.send(games);
        }
    }
    catch(err){
        console.log(err);
        res.send(500);
    }
}

export async function addGame(req, res){
    
    try{
        res.status(201);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
}
import db from "../db.js"
import gameSchema from "../schemas/gameSchema.js"

export default async function validadeGameMiddleware(req, res, next){
    const validation=gameSchema.validate(req.body);

    if(validation.error){
        return res.sendStatus(422);
    }

    const {name, stockTotal, pricePerDay, categoryId}=req.body;

    if(parseInt(stockTotal)<=0 || parseInt(pricePerDay)<=0){
        return res.sendStatus(400);
    }
    
    try {
        const category=await db.query("SELECT id FROM categories WHERE id=$1", [
            categoryId
          ]);

        const repeatName= await db.query("SELECT id FROM games WHERE name=$1", [
            name
        ]);

        if(category.rowCount===0){
            return res.sendStatus(400);
        }

        if(repeatName.rowCount>0){
            return res.sendStatus(409);
        }
        next();
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


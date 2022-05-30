import db from "../db.js";
import customersSchema from "../schemas/customerSchema.js";

export async function validateCustomersMiddleware(req, res, next){
    const validation=customersSchema.validate(req.body);

    if(validation.error){
        return res.sendStatus(422);
    }
    next();
}

export async function validateUpgradeCustomersMiddleware(req, res, next){
    const validation=customersSchema.validate(req.body);

    if(validation.error){
        return res.sendStatus(422);
    }

    const {id}=req.params;
    const {cpf}=req.body;
    
    try{
        const user= await db.query(`
            SELECT * 
            FROM customers
            WHERE cpf=$1`, 
            [cpf]
        );

        if(user.rowCount > 0 && user.rows[0].id !=id){
            return res.sendStatus(409);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    next();

}

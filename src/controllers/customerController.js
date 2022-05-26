import db from "../db";

export async function getCustomers(req, res){
    const cpf=req.query.cpf;

    try{
        if(!cpf){
            const {rows: customers } = await db.query(`
            SELECT * FROM customers`);
            res.send(customers);
        }
        else{
            const {rows: customers} = await db.query(`
            SELECT * FROM customers
            WHERE cpf LIKE $1`,[`${cpf}%`]);
            res.send(customers);            
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
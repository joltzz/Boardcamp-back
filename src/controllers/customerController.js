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



export async function getCustomer(req, res) {
    const { id } = req.params
  
    try {
        const { rows: customer } = await db.query(`
        SELECT * FROM customers
        WHERE id=$1`,[id]);
  
        if(customer.length===0){
          return res.sendStatus(404);
        }
        res.send(customer[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
}
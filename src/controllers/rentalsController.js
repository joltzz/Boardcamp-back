import db from "../db.js";
import dayjs from "dayjs";


export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    const { rows: rentals } = await db.query(`
    SELECT 
      rentals.*,
      customers.name AS "customerName",
      customers.id AS "customerId",
      games.id AS "gameId",
      games.name AS "gameName", 
      categories.name AS "categoryName", 
      categories.id AS "categoryId" 
    FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id
      ${customerId ? `WHERE customers.id = ${parseInt(customerId)}` : ""}
      ${gameId ? `WHERE games.id = ${parseInt(gameId)}` : ""}
    `);

    const listRentals = rentals.map((r) => {
      const entry = {
        ...r,
        rentDate: dayjs(r.rentDate).format("YYYY-MM-DD"),
        customer: {
          id: r.customerId,
          name: r.customerName,
        },
        game: {
          id: r.gameId,
          name: r.gameName,
          categoryId: r.categoryId,
          categoryName: r.categoryName,
        },
      };
      delete entry.customerId;
      delete entry.customerName;

      delete entry.gameId;
      delete entry.gameName;

      delete entry.categoryId;
      delete entry.categoryName;

      return entry;
    });
    res.send(listRentals);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}
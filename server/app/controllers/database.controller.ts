import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";


import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/birds/nullpredator", async (req: Request, res: Response) => {
      try {
        const queryText = 'SELECT * FROM Especeoiseau WHERE nomscientifiquecomsommer IS NULL;';
        const birdsWithNullPredator = await this.databaseService.query(queryText);
        res.json(birdsWithNullPredator);
      } catch (error) {
        console.error(error.stack);
        res.status(500).send("An error occurred while fetching birds with no predator specified.");
      }
    });
    
    

    router.get("/birds", async (req: Request, res: Response) => {
      try {
        const birds = await this.databaseService.query('SELECT * FROM Especeoiseau;');
        res.json(birds);
      } catch (error) {
        console.error(error.stack);
        res.status(500).send("An error occurred while fetching birds.");
      }
    });
    
    router.delete("/birds/:nomscientifique", async (req: Request, res: Response) => {
      try {
        const { nomscientifique } = req.params; 
        const queryText = `DELETE FROM Especeoiseau WHERE nomscientifique = $1;`; 
        const result = await this.databaseService.query(queryText, [nomscientifique]); 
        console.log(result);
        res.json({ deletedRows: result.rowCount });
      } catch (error) {
        console.error(error.stack);
        res.status(500).send("An error occurred while deleting the bird.");
      }
    });

    router.post("/birds/insert", async (req: Request, res: Response) => {
      try {
        const bird = req.body;
        if (bird.nomscientifiquecomsommer) {
          const checkQuery = `SELECT 1 FROM Especeoiseau WHERE nomscientifique = $1;`;
          const checkResult = await this.databaseService.query(checkQuery, [bird.nomscientifiquecomsommer]);
          if (checkResult.rowCount === 0) {
            res.status(400).send("The specified 'nomscientifiquecomsommer' does not exist in the database.");
            return;
          }
        }
    
        const insertQuery = `
          INSERT INTO Especeoiseau (nomscientifique, nomcommun, statutspeces, nomscientifiquecomsommer) 
          VALUES ($1, $2, $3, $4);`;
        const insertResult = await this.databaseService.query(insertQuery, [
          bird.nomscientifique, 
          bird.nomcommun, 
          bird.statutspeces, 
          bird.nomscientifiquecomsommer || null
        ]);
        res.status(201).json({ rowsAffected: insertResult.rowCount });
      } catch (error) {
        console.error(error.stack);
        res.status(500).send("An error occurred while creating the bird.");
      }
    });

    router.put("/birds/update/:nomscientifique", async (req: Request, res: Response) => {
      try {
        const { nomscientifique } = req.params; 
        const bird = req.body; 
        
        if (bird.nomscientifiquecomsommer) {
          const checkQuery = `SELECT 1 FROM Especeoiseau WHERE nomscientifique = $1;`;
          const checkResult = await this.databaseService.query(checkQuery, [bird.nomscientifiquecomsommer]);
          if (checkResult.rowCount === 0) {
             res.status(400).send("The specified 'nomscientifiquecomsommer' does not exist in the database.");
             return;
          }
        }
        const updateQuery = `
          UPDATE Especeoiseau 
          SET nomcommun = $1, statutspeces = $2, nomscientifiquecomsommer = $3, nomscientifique = $5
          WHERE nomscientifique = $4;
        `;
        const updateResult = await this.databaseService.query(updateQuery, [
          bird.nomcommun, 
          bird.statutspeces, 
          bird.nomscientifiquecomsommer, 
          nomscientifique,
          bird.nomscientifique
        ]);
        
        if (updateResult.rowCount === 0) {
           res.status(404).send("Bird species not found.");
           return;
        }
        res.status(200).json({ message: "Bird updated successfully.", rowsAffected: updateResult.rowCount });
      } catch (error) {
        console.error(error.stack);
        res.status(500).send("An error occurred while updating the bird.");
      }
    });
    
    return router;
  }
}

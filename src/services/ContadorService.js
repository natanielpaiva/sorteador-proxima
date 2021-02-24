import { DatabaseConnection } from '../database/database-connection'

const table = "contador"
const db = DatabaseConnection.getConnection()

export default class ContadorService {


    static addData(qtdPorTime) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (qtdPorTime) 
                values (?)`,
                    [qtdPorTime],
                    (_, { insertId, rows }) => {
                        // console.log("id insert: " + insertId);
                        resolve(insertId)
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
            }, (txError) => {
                console.log(txError);
            }));
    }

    static findQtdPorTime() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} order by id desc limit 1`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static deleteById(id) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);

            });
    }
    
}
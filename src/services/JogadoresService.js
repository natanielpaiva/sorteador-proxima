import { DatabaseConnection } from '../database/database-connection'

const table = "jogadores"
const db = DatabaseConnection.getConnection()

export default class JogadoresService {

    static addAllPlayers(lista, qtdPorTime) {
        let qtdPorTimeInicial = qtdPorTime
        let numeroTime = 1
        let controleLaco = 1
        lista.forEach((jogador, i) => {
            let status = 'Jogando'
            if(numeroTime > 2)
                status = 'Próximo'

            JogadoresService.addData(jogador, i, 'Time ' + numeroTime, status)
            if (controleLaco == qtdPorTime) {
                qtdPorTime = parseInt(qtdPorTime) + parseInt(qtdPorTimeInicial)
                numeroTime++
            }
            controleLaco++
        });
    }

    static addData(jogador, ordem, time, status) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome, ordem, time, status) 
                values (?, ?, ?, ?)`,
                    [jogador, ordem, time, status],
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


    static updateOrdemById(id, ordem) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set ordem = ? where id = ?;`, [ordem, id], () => {
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findById(id) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }
    static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} order by ordem`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))

    }

}
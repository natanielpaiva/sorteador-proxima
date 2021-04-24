import { DatabaseConnection } from '../database/database-connection'

const table = "jogadores"
const db = DatabaseConnection.getConnection()

export default class JogadoresService {

    static addAllPlayers(lista, qtdPorTime) {
        let qtdPorTimeInicial = qtdPorTime
        let numeroTime = 1
        let controleLaco = 1
        lista.forEach((jogador, i) => {
            JogadoresService.addData(jogador, controleLaco, 'Time ' + numeroTime, numeroTime)
            if (controleLaco == qtdPorTime) {
                qtdPorTime = parseInt(qtdPorTime) + parseInt(qtdPorTimeInicial)
                if (jogador !== "")
                    numeroTime++
            }
            if (jogador !== "")
                controleLaco++
        });
    }

    static addData(jogador, ordem, time, numeroTime) {
        let pago = false;
        if (jogador !== "") {
            return new Promise((resolve, reject) => db.transaction(
                tx => {
                    tx.executeSql(`insert into ${table} (nome, ordem, time, numeroTime, pago) 
                    values (?, ?, ?, ?, ?)`,
                        [jogador, ordem, time, numeroTime, pago],
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

    static updatePago(id, pago) { 
        db.transaction(
            tx => {
                tx.executeSql(`update ${table} set pago=? where id = ?;`, [pago, id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);
            });
    }

    static deleteAll() {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table}`, [], (_, { rows }) => {
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

    static findByNumeroTime(numeroTime) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where numeroTime=? order by ordem`, [numeroTime], (_, { rows }) => {
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

    static findLastRegister() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} order by ordem desc limit 1`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))

    }

    static countNumberPorTime() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select count(*) as contador from ${table} where numeroTime = 1`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))
    }

    static countNumberUltimoTime(numeroTime) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select count(*) as contador from ${table} where numeroTime = ${numeroTime}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))
    }

}
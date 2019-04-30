'use strict';

const db = require('../mySql');

/**
 * Save new computer in Database
 * @param {string} name 
 * @param {number} ownerId
 */
exports.save = (name, userId) => {
  return new Promise((resolve, reject) => {
      db.query('INSERT INTO Computers SET `name` = ?, `ownerId` = ?', [name, userId], (error, results, fields) => {
          if (error) {
              reject(error);
          } else {
              resolve(results.insertId);
          }
      });
  });
}

/**
 * 
 */
exports.update = (computerId, computerName) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE Computers SET `name` = ? WHERE `id` = ? ', [computerName, computerId], (error, results, fields) => {
        if (error) {
            reject(error);
        } else {
            if (results.changedRows == 0) {
                reject();
            } else {
                resolve(results.changedRows);
            }

        }
    });
});
}

exports.userOwnsComputer = (userId, computerId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Computers WHERE id = ? AND ownerId = ?', [computerId, userId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length === 1);
        }
    });
});
}
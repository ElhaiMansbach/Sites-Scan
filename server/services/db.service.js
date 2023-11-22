const mysql = require("mysql");

class DBConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    });
  }

  readScans(word) {
    return new Promise((resolve, reject) => {
      const columns = ["scan_id", "timestamp", "url", "keyword", "found"];
      this.pool.query(
        "SELECT ?? FROM scans WHERE keyword = ?",
        [columns, word],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  }
  readScansByURLAndKeyword(url, keyword) {
    return new Promise((resolve, reject) => {
      const columns = ["scan_id", "timestamp", "url", "keyword", "found"];
      this.pool.query(
        "SELECT ?? FROM scans WHERE url = ? AND keyword = ?",
        [columns, url, keyword],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  }

  writeScans(scan) {
    return new Promise((resolve, reject) => {
      const { url, keyword } = scan;

      // Check if the data already exists
      this.readScansByURLAndKeyword(url, keyword)
        .then((selectResults) => {
          // If data already exists, resolve without inserting
          if (selectResults.length > 0) {
            console.log("Data already exists. Not inserting.");
            return resolve("Data already exists.");
          }

          // Data does not exist, proceed with the INSERT query
          this.pool.query(
            "INSERT INTO scans SET ?",
            [scan],
            (insertError, insertResults) => {
              if (insertError) {
                return reject(insertError);
              }
              resolve(insertResults);
            }
          );
        })
        .catch(reject);
    });
  }
}
module.exports = new DBConnection();

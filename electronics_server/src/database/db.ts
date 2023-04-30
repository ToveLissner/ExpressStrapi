import sqlite3 from "sqlite3";
import { IUser } from "../models/IUser";

export const db = new sqlite3.Database("databaseRegister");

db.run(`
    CREATE TABLE IF NOT EXISTS accounts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(150),
        CONSTRAINT uniqueUsername UNIQUE(username)
    )
`);

export const checkUserNameAndPassword = async (
  username: string,
  password: string,
  callback: Function
) => {
  const sql_query = `SELECT COUNT(*) AS count FROM accounts WHERE username = ? AND password = ?`;
  db.all(sql_query, [username, password], callback);
};

export const login = async (user: IUser, callback: Function) => {
  const sql_query = `SELECT * FROM accounts WHERE username = ?`;
  db.all(sql_query, user, callback);
};

export const createUser = async (user: IUser, callback: Function) => {
  const sql_query = `INSERT INTO accounts (username, password) VALUES (?,?)`;
  const values = [user.username, user.password];
  db.run(sql_query, values, callback);
};

export const checkUserName = async (username: string, callback: Function) => {
  const sql_query = `SELECT COUNT(*) AS count FROM accounts WHERE username = ?`;
  db.all(sql_query, [username], callback);
};

export const getAll = async (callback: Function) => {
  const sql_query = `SELECT * FROM accounts`;
  db.all(sql_query, callback);
};

export const getById = async (id: number, callback: Function) => {
  const sql_query = `SELECT * FROM accounts WHERE id=?`;
  db.get(sql_query, [id], callback);
};

export const deleteById = async (id: number) => {
  const sql_query = `DELETE FROM accounts WHERE id = ?`;
  db.run(sql_query, [id]);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var better_sqlite3_1 = require("better-sqlite3");
var path_1 = require("path");
var dbPath = path_1.default.join(process.cwd(), 'data', 'cl0v.db');
var db = new better_sqlite3_1.default(dbPath, { verbose: console.log });
db.pragma('foreign_keys = ON');
exports.default = db;

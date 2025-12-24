"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../lib/db");
var test = db_1.default.prepare("SELECT * FROM clubs").all();
console.log(test);

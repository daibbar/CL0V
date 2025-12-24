import db from '../lib/db'
import { Club, Event, Activity, Student } from "../types/db"


const test = db.prepare("SELECT * FROM clubs").all() as Club[];

console.log(test);
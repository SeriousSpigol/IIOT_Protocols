"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://192.168.102.21');
var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Vmware1!',
    database: 'IOTProtocols'
});
client.on('connect', function () {
    client.subscribe('scooters/#');
    console.log("Service on...");
});
client.on('message', function (topic, message) {
    var temp = topic.split("/");
    var detection = new Detection();
    detection.scooterid = temp[1];
    detection.readingdate = new Date();
    switch (temp[2]) {
        case "battery":
            detection.battery = parseInt("" + message);
            break;
        case "speed":
            detection.speed = parseInt("" + message);
            break;
        case "position":
            var valuesTmp = "" + message;
            var values = valuesTmp.split(" ");
            detection.lat = parseFloat(values[0]);
            detection.lon = parseFloat(values[1]);
            break;
        case "status":
            detection.status = "" + message;
            break;
        default:
            break;
    }
    console.log("Data: " + message);
    connection.query('INSERT INTO detections SET ?;', [detection], function (error, results, fields) {
        if (!error)
            console.log("Save successful");
    });
});
class Detection {
    constructor(battery, speed, lat, lon, status, scooterid, readingdate) {
        this.battery = battery;
        this.speed = speed;
        this.lat = lat;
        this.lon = lon;
        this.status = status;
        this.scooterid = scooterid;
        this.readingdate = readingdate;
    }
}

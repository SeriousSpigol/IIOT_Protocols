"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const amqp = require("amqplib/callback_api");
var sql = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Vmware1!',
    database: 'IOTProtocols'
});
var connectionString = "amqps://bzsuiemn:suzKkZg1O5lH71TFtuBjtBxret2cp6oY@bonobo.rmq.cloudamqp.com/bzsuiemn";
var queue = 'CantonQueue';
amqp.connect(connectionString, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
            var detection = new Detection();
            var temp = msg.fields.routingKey.split(".");
            detection.scooterid = temp[1];
            var message = msg.content;
            detection.readingdate = new Date();
            switch (temp[2]) {
                case "Battery":
                    detection.battery = parseInt("" + message);
                    break;
                case "Speed":
                    detection.speed = parseInt("" + message);
                    break;
                case "Position":
                    var valuesTmp = "" + message;
                    var values = valuesTmp.split(" ");
                    detection.lat = parseFloat(values[0]);
                    detection.lon = parseFloat(values[1]);
                    console.log(values[0]);
                    console.log(values[1]);
                    console.log(detection.lat);
                    console.log(detection.lon);
                    break;
                case "Status":
                    detection.status = "" + message;
                    break;
                default:
                    break;
            }
            sql.query('INSERT INTO detctions SET ?;', [detection], function (error, results, fields) {
                if (error)
                    console.log(error);
            });
        }, {
            noAck: true
        });
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

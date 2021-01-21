using System;
using RabbitMQ.Client;
using System.Text;
using Client.Sensors;
using System.Collections.Generic;

namespace Client
{
    class Send
    {
        public static void Main()
        {
            var sensors = new VirtualSensors();
            var factory = new ConnectionFactory() { Uri = new Uri ("amqps://bzsuiemn:suzKkZg1O5lH71TFtuBjtBxret2cp6oY@bonobo.rmq.cloudamqp.com/bzsuiemn") };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "CantonQueue",
                                     durable: true,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                while (true) {

                    Random random = new Random();
                    var id = random.Next(1, 100);
                    var batterydata = sensors.GetBattery();
                    var speeddata = sensors.GetSpeed();
                    var positiondata = sensors.GetLatLong();

                    //string message = speeddata;
                    //var body = Encoding.UTF8.GetBytes(message);
                    var battery = Encoding.UTF8.GetBytes(batterydata);
                    var speed = Encoding.UTF8.GetBytes(speeddata);
                    var position = Encoding.UTF8.GetBytes(positiondata);

                    channel.BasicPublish(exchange: "ExchangeCanton",
                                        routingKey: "Scooters." + id + ".Speed",
                                        basicProperties: null,
                                        body: speed);

                    channel.BasicPublish(exchange: "ExchangeCanton",
                                        routingKey: "Scooters." + id + ".Battery",
                                        basicProperties: null,
                                        body: battery);

                    channel.BasicPublish(exchange: "ExchangeCanton",
                                        routingKey: "Scooters." + id + ".Position",
                                        basicProperties: null,
                                        body: position);

                    Console.WriteLine(" [eScooter" + id + "] Sent Speed: " + speeddata + ", Battery: " + batterydata + ", Position: " + positiondata);
                    Console.WriteLine(" Press [enter] to exit.");

                    var key = Console.ReadKey();

                    if (key.Key == ConsoleKey.Enter) 
                        break;
                }
                
            }

            
        }
    }
}

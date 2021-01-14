using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace Client.Sensors
{
    class VirtualSpeedSensor : SpeedSensorInterface, SensorInterface
    {
        public string toJson()
        {
            return "{\"speed\": " + GetSpeed() + "km/h }";
        }

        public int GetSpeed()
        {
            var speed = new Random() ;
            return speed.Next(0, 25);
        }
    }

}

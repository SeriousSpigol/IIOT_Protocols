using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Client.Sensors
{
    class VirtualBatterySensor : BatterySensorInterface, SensorInterface
    {
        public string toJson()
        {
            return "{\"battery\": " + GetBattery() + "% }";
        }
        
        public int GetBattery()
        {
            var battery = new Random();
            return battery.Next(0, 100);
        }
    }
}

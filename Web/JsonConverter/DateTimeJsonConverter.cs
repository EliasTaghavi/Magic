using Newtonsoft.Json;
using System;
using System.Globalization;

namespace Web.JsonConverter
{
    public class DateTimeJsonConverter : JsonConverter<DateTime>
    {
        private readonly CultureInfo persianCulture = new("fa-IR");

        public override DateTime ReadJson(JsonReader reader, Type objectType, DateTime existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            return TimeZoneInfo.ConvertTimeToUtc(existingValue);
        }

        public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer)
        {
            try
            {
                writer.WriteValue(value.ToString("yyyy/MM/dd", persianCulture));
            }
            catch (Exception)
            {
                writer.WriteNull();
            }
        }
    }
}

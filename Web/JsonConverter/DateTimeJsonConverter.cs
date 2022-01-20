using Newtonsoft.Json;
using System.Globalization;
using Web.Models;

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

    public class FromToDateTimeJsonConverter : JsonConverter<FromToViewModel<DateTime?>>
    {
        private readonly CultureInfo persianCulture = new("fa-IR");

        public override FromToViewModel<DateTime?> ReadJson(JsonReader reader, Type objectType, FromToViewModel<DateTime?> existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            return new FromToViewModel<DateTime?>
            {
                From = existingValue?.From != null ? TimeZoneInfo.ConvertTimeToUtc(existingValue.From.Value) : null,
                To = existingValue?.To != null ? TimeZoneInfo.ConvertTimeToUtc(existingValue.From.Value) : null,
            };
        }

        public override void WriteJson(JsonWriter writer, FromToViewModel<DateTime?> value, JsonSerializer serializer)
        {
            try
            {
                var result = new
                {
                    From = value?.From.Value.ToString("yyyy/MM/dd", persianCulture),
                    To = value?.To.Value.ToString("yyyy/MM/dd", persianCulture),
                };

                writer.WriteValue(result);
            }
            catch (Exception)
            {
                writer.WriteNull();
            }
        }
    }
}

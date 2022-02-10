namespace Core.Base.Dto
{
    public class ColumnChartDto
    {
        public List<ChartNode<string, decimal>> Data { get; set; }
        public string Label { get; set; }
    }
}

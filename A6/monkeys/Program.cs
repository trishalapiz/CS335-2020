namespace tlap632_Monkeys
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;

    public class Program
    {
        public static void Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)

                .ConfigureLogging (logging => {
                    logging
                        .ClearProviders ()
                        .AddConsole ()
                        .AddFilter (level => level >= LogLevel.Warning);
                })

                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseUrls("http://localhost:8081", "https://localhost:8082");
                })

                .Build();

            host.Run();

        }

        static async Task toFitness() { // Monkeys acting as client, forwarding to Fitness?
            var toFitness = new HttpClient ();
            
            toFitness.BaseAddress = new Uri ("http://localhost:8091/");
            toFitness.DefaultRequestHeaders.Accept.Clear ();
            toFitness.DefaultRequestHeaders.Accept.Add (
                new MediaTypeWithQualityHeaderValue ("application/json"));


            var hrm = await PostAsync(toFitness, "/assess")
        }
    }
}

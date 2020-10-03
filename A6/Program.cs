namespace Assignment
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;

    public class Program
    {
        public static void Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.useStartup<Startup> ();
                webBuilder.UseUrls ("http://localhost:8081", "https://localhost:8082"); })
                .Build();

            host.Run();
        }
    }
}

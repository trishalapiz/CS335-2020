// namespace Assignment
// {
    using Carter;
    using Microsoft.AspNetCore.Http;

    public class HomeModule : CarterModule {
        static int target;
        public HomeModule () {
            Get ("/", async (req, res) => {
                await res.WriteAsync ("Hello from Carter!"); 
                // Writes the given text to the response body. UTF-8 encoding will be used.
            });

            Get("/target", async(req,res) => {
                Microsoft.Extensions.Primitives.StringValues x;
                req.Query.TryGetValue("id", out x);
                await res.WriteAsync(x);  // send integer here as a response
                // Writes the given text to the response body. UTF-8 encoding will be used.
            });

            Get("/target2", async(req,res) => {
                var x = await req.Bind<Data>(); // "Bind" = binding to actual variable in Data.x
                await res.WriteAsync(x.ToString());
            });

            Post("/", async (req, res) => 
                await res.WriteAsync ("Testing POST"));
        }

        public class Data {
            public int x {
                get;
                set;
            }

            public override string ToString()
            {
                return x.ToString();
            }

        }
    }

namespace tlap632_Fitness
{
    using Carter;
    using Microsoft.AspNetCore.Http;
    using System;

    public class HomeModule : CarterModule
    {
        Microsoft.Extensions.Primitives.StringValues clientText, monkeyText;
       
        public HomeModule()
        {
            // It receives a text from a client and uses this for determining the Hamming distances requested by Monkeys.
            var hammingDistance = 0;
            Get("/target", async(req,res) => { // retrieve actual string from client
                req.Query.TryGetValue("text", out clientText);// send integer here as a response
            });

            Get("/assess", async(req,res) => { 
                // retrieve text from Monkey
                // CALCULATE HAMMING DISTANCE?
                // send in the form of {"number" : hamming distance}
                req.Query.TryGetValue("text", out monkeyText); // extract the string to be assessed


                if (clientText.ToString().Length != monkeyText.ToString().Length) {
                    // IF STRINGS ARE NOT OF EQUAL LENGTH
                    var difference = Math.Abs(clientText.ToString().Length - monkeyText.ToString().Length);
                    var len = Math.Min(clientText.ToString().Length, monkeyText.ToString().Length);
                    hammingDistance = len + difference;
                } else {
                    // IF BOTH ARE EQUAL LENGTH
                    var clientCharList = clientText.ToString().ToCharArray();
                    var monkeyCharList = monkeyText.ToString().ToCharArray();

                    hammingDistance = clientCharList.Zip(monkeyCharList, (c1, c2) => new { c1, c2 }).Count(m => m.c1 != m.c2);
                }

                await res.AsJson({"number" = hammingDistance});
            });

        }   
    }
}

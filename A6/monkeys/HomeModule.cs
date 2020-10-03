namespace tlap632_Monkeys
{
    using Carter;
    using Microsoft.AspNetCore.Http;

    public class HomeModule : CarterModule
    {
        static string receivedText;
        public HomeModule()
        {

            // About Monkeys, your second hypothesis is correct. 
            // Its job is very simple. It receives a text from a client, 
            // forwards it to Monkeys, receives back an int, 
            // and finally returns that int back to the client.
            
            Get("/try", async(req,res) => { // retrieve string from client
                req.Query.TryGetValue("text", out receivedText);
                res.AsJson();
            });

            Post("/assess", async(req, res) => { // forward string to Fitness?
                req.Query.TryGetValue("text", out receivedText);
                // pass dictionary instead?
                
            });



        }
    }
}

public class Phrase {

}

// With the two servers running (on localhost):
// 1. Client posts a target text to Fitness .../target (empty ok response)
// 2. Client posts a genome (candidate) text to Monkeys .../try
// 3. Monkeys posts the received genome text to Fitness .../assess
// 4. Fitness responds to Monkeys with the Hamming distance between its stored
// target text and the received genome text
// 5. Monkeys returns this integer in his response to Client
namespace Monkeys {
    using Carter;
    using Carter.ModelBinding;
    using Carter.Request;
    using Carter.Response;
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using static System.Console;
    
    public class HomeModule : CarterModule {
        public HomeModule () {
            // ***
            Post ("/try", async (req, res) => {

                TryRequest treq = await req.Bind<TryRequest>();
                GeneticAlgorithm(treq); // run the algorithm

                await Task.Delay(0);
                return;
            });
        }
        
        // ***
        async Task<AssessResponse> PostFitnessAssess (AssessRequest areq) {
            await Task.Delay (0);

            var client = new HttpClient (); 
            client.BaseAddress = new Uri("http://localhost:8091"); // 8091 = Fitness
                client.DefaultRequestHeaders.Accept.Clear ();
                client.DefaultRequestHeaders.Accept.Add (
                    new MediaTypeWithQualityHeaderValue ("application/json"));

            var assess = await client.PostAsJsonAsync("/assess", areq);
            assess.EnsureSuccessStatusCode();
            AssessResponse response = await assess.Content.ReadAsAsync<AssessResponse>();

            return response;
        }
        
        // ***
        async Task PostClientTop (TopRequest treq) {
            // ... UDOO
            await Task.Delay (0);
            
            var client = new HttpClient (); 
            client.BaseAddress = new Uri("http://localhost:8101"); // 8101 = client
                client.DefaultRequestHeaders.Accept.Clear ();
                client.DefaultRequestHeaders.Accept.Add (
                    new MediaTypeWithQualityHeaderValue ("application/json"));

            var result = await client.PostAsJsonAsync("/top", treq); // pass the genome with the lowest hamming distance score to be printed
                result.EnsureSuccessStatusCode ();
            return;
        }
        
        private Random _random = new Random (1);
        
        private double NextDouble () {
            lock (this) {
                return _random.NextDouble ();
            }
        }
        
        private int NextInt (int a, int b) {
            lock (this) {
                return _random.Next (a, b);
            }
        }

        int ProportionalRandom (int[] weights, int sum) {
            var val = NextDouble () * sum;
            
            for (var i = 0; i < weights.Length; i ++) {
                if (val < weights[i]) return i;
                
                val -= weights[i];
            }
            
            WriteLine ($"***** Unexpected ProportionalRandom Error");
            return 0;
        }

        async void GeneticAlgorithm (TryRequest treq) {
            WriteLine ($"..... GeneticAlgorithm {treq}");
            // treq = $"{{{id}, {parallel}, {monkeys}, {length}, {crossover}, {mutation}, {limit}}}";
            
            await Task.Delay (0);
            
            var id = treq.id;
            var monkeys = treq.monkeys;
            if (monkeys % 2 != 0) monkeys += 1;
            var length = treq.length;
            var crossover = treq.crossover / 100.0 ;
            var mutation = treq.mutation / 100.0;
            var limit = treq.limit;
            if (limit == 0) limit = 1000;

            AssessRequest newReq = new AssessRequest();
            List<string> strings = new List<string>();

            if (length == 0) {

                newReq.id = id;       
                strings.Add("");
                newReq.genomes = strings;
                AssessResponse response = await PostFitnessAssess(newReq);
                var scores = response.scores;
                length = scores.ElementAt(0); // finding the length  

            } else {
                
                // for the number of monkeys, create strings as genomes
                strings = Enumerable.Range(1, monkeys).Select(s => {
                    string word = "";
                        for (int j = 0; j < length; j++) { // length being the length of each word
                            var c = (char) NextInt(32,127); // 32 = space, 127 = del (doesn't include this)
                            word = word + c;
                        }
                        return word;
                }).ToList();

                
                newReq.id = id;
                newReq.genomes = strings; // pass the genomes list

            }


            int prev_score = int.MaxValue; // 2147483647
                        
            for (int loop = 0; loop < limit; loop ++) { // EVOLUTION LOOP

                AssessResponse fitnessResponse = await PostFitnessAssess(newReq); // returns AssessResponse object

                strings = newReq.genomes;

                int best_score = fitnessResponse.scores.Min(); // receives the best hamming distance of current generation
                int largest_score = fitnessResponse.scores.Max(); // used to compute weights

                if (best_score < prev_score) { // replace prev_score for next generation
                    prev_score = best_score;
                    // to be sent to PostClientTop() to print:
                    TopRequest obj2 = new TopRequest();
                    obj2.id = id;
                    obj2.loop = loop; 
                    obj2.score = best_score;
                    int index = fitnessResponse.scores.IndexOf(best_score); // find genome with the best hamming distance
                    obj2.genome = strings[index];
                    await PostClientTop(obj2);
                }

                if (best_score == 0) {
                    break; // already found target string
                } 

                var weights = fitnessResponse.scores.Select( w => (largest_score - w) + 1 ).ToList(); // generate weights
                int sumWeights = weights.Sum(); 

                var parallel = treq.parallel;

                // CHECK IF RUNNING IN PARALLEL MODE
                if (parallel == true) {
                        List<string> new_genomes = ParallelEnumerable.Range(1, monkeys/2).SelectMany<int, string>(i => {
                        var index1 = ProportionalRandom(weights.ToArray(), sumWeights);
                        var index2 = ProportionalRandom(weights.ToArray(), sumWeights);
                        // get random parents
                        string first_parent = strings[index1]; 
                        string second_parent = strings[index2];
                        string first_child = "";
                        string second_child = "";
                        
                        double some_random = NextDouble();

                        if (some_random < crossover) { // if random < crossoverProbability
                            int crossoverIndex = NextInt(0, length); 
                            
                            first_child = first_parent.Substring(0, crossoverIndex) + second_parent.Substring(crossoverIndex);
                            second_child = second_parent.Substring(0, crossoverIndex) + first_parent.Substring(crossoverIndex);
                        } else {
                            first_child = first_parent;
                            second_child = second_parent;
                        }

                        double random1 = NextDouble();
                        double random2 = NextDouble();
                        if (random1 < mutation) {
                            // randomly change 1 single char in c1
                            int randIndex = NextInt(0, length);
                            var randChar = (char) NextInt(32, 127);

                            first_child = first_child.Substring(0,randIndex) + randChar + first_child.Substring(randIndex + 1);

                        }

                        if (random2 < mutation) {
                            // randomly change 1 single char in c1
                            int randIndex = NextInt(0, length);
                            var randChar = (char) NextInt(32, 127);

                            second_child = second_child.Substring(0,randIndex) + randChar + second_child.Substring(randIndex + 1);

                        }

                        return new[] {first_child, second_child};
                        }).ToList(); 

                        // put new_genomes and id in AssessRequest 'newReq'
                        newReq.id = id;
                        newReq.genomes = new_genomes;
                        
                } else { // IF NOT PARALLEL MODE
                        List<string> new_genomes = Enumerable.Range(1, monkeys/2).SelectMany<int, string>(i => {
                        var index1 = ProportionalRandom(weights.ToArray(), sumWeights);
                        var index2 = ProportionalRandom(weights.ToArray(), sumWeights);
                        // get random parents
                        string first_parent = strings[index1]; 
                        string second_parent = strings[index2];
                        string first_child = "";
                        string second_child = "";
                        
                        double some_random = NextDouble();

                        if (some_random < crossover) { // if random < crossoverProbability
                            int crossoverIndex = NextInt(0, length); 
                            
                            first_child = first_parent.Substring(0, crossoverIndex) + second_parent.Substring(crossoverIndex);
                            second_child = second_parent.Substring(0, crossoverIndex) + first_parent.Substring(crossoverIndex);
                        } else {
                            first_child = first_parent;
                            second_child = second_parent;
                        }

                        double random1 = NextDouble();
                        double random2 = NextDouble();
                        if (random1 < mutation) {
                            // randomly change 1 single char in c1
                            int randIndex = NextInt(0, length);
                            var randChar = (char) NextInt(32, 127);

                            first_child = first_child.Substring(0,randIndex) + randChar + first_child.Substring(randIndex + 1);

                        }

                        if (random2 < mutation) {
                            // randomly change 1 single char in c1
                            int randIndex = NextInt(0, length);
                            var randChar = (char) NextInt(32, 127);

                            second_child = second_child.Substring(0,randIndex) + randChar + second_child.Substring(randIndex + 1);

                        }

                        return new[] {first_child, second_child};
                        }).ToList(); 

                        // put new_genomes and id in AssessRequest 'newReq'
                        newReq.id = id;
                        newReq.genomes = new_genomes;
                }
            }
        }
    }
    
    // public class TargetRequest {
        // public int id { get; set; }
        // public bool parallel { get; set; }
        // public string target { get; set; }
        // public override string ToString () {
            // return $"{{{id}, {parallel}, \"{target}\"}}";
        // }  
    // }    

    public class TryRequest {
        public int id { get; set; }
        public bool parallel { get; set; }
        public int monkeys { get; set; }
        public int length { get; set; }
        public int crossover { get; set; }
        public int mutation { get; set; }
        public int limit { get; set; }
        public override string ToString () {
            return $"{{{id}, {parallel}, {monkeys}, {length}, {crossover}, {mutation}, {limit}}}";
        }
    }
    
    public class TopRequest {
        public int id { get; set; }
        public int loop { get; set; }
        public int score { get; set; }
        public string genome { get; set; }
        public override string ToString () {
            return $"{{{id}, {loop}, {score}, {genome}}}";
        }  
    }    
    
    public class AssessRequest {
        public int id { get; set; }
        public List<string> genomes { get; set; }
        public override string ToString () {
            return $"{{{id}, #{genomes.Count}}}";
        }  
    }
    
    public class AssessResponse {
        public int id { get; set; }
        public List<int> scores { get; set; }
        public override string ToString () {
            return $"{{{id}, #{scores.Count}}}";
        }  
    }   
}

namespace Monkeys {
    using Carter;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.DependencyInjection;

    public class Startup {
        public void ConfigureServices (IServiceCollection services) {
            services.AddCarter ();
        }

        public void Configure (IApplicationBuilder app) {
            app.UseRouting ();
            app.UseEndpoints( builder => builder.MapCarter ());
        }
    }
}

namespace Monkeys {
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;

    public class Program {
        public static void Main (string[] args) {
//          var host = Host.CreateDefaultBuilder (args)
//              .ConfigureWebHostDefaults (webBuilder => webBuilder.UseStartup<Startup>())

            var urls = new[] {"http://localhost:8081"};
            
            var host = Host.CreateDefaultBuilder (args)
            
                .ConfigureLogging (logging => {
                    logging
                        .ClearProviders ()
                        .AddConsole ()
                        .AddFilter (level => level >= LogLevel.Warning);
                })
                
                .ConfigureWebHostDefaults (webBuilder => {
                    webBuilder.UseStartup<Startup> ();
                    webBuilder.UseUrls (urls);  // !!!
                })
                
                .Build ();
            
            System.Console.WriteLine ($"..... starting on {string.Join (", ", urls)}");            
            host.Run ();
        }
    }
}


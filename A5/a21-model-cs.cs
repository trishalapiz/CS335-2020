using System;
using System.Linq;
using System.IO;
using System.Collections.Generic;

/// dotnet build a21-model-cs.csproj
/// dotnet ./bin/Debug/netcoreapp3.1/a21-model-cs.dll < a21-inp2.txt > a21-outp2-test.txt
class Program {
    static void Main () {
        /// ...
        // Console.WriteLine() is used to output (print) values. ====== like System.out.println() in Java

        var inp = Console.In.ReadToEnd(); // read the entire text
    
        var removeEscChars = inp.Replace("\r\n", " ");
        var splitInput = removeEscChars.Split(" ");

        var noSpaces = splitInput.Where(element => element != "");

        Console.WriteLine("noSpaces be like");

        foreach (string n in noSpaces)
        {
            Console.WriteLine(n);
        }

        try  {
            var nums = noSpaces.Select(x => Int32.Parse(x)); // convert the numbers from strings to integers
            var odds = nums.Where(x => x % 2 != 0); // get the odd numbers
            var halvedEvens = nums.Where(x => x % 2 == 0).Select(y => y / 2); // get the even numbers and half them

            var combine = odds.Concat(halvedEvens).ToArray(); // merge the two lists

            var final = combine.Distinct(); // get rid of the duplicates

            var sum = final.Sum(); // sum up the numbers in the final list

            Console.WriteLine(sum); // print the sum
        } catch (Exception e) {
                Console.WriteLine("*** " + e.Message);

        }

    }   
}


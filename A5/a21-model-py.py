import sys
import functools
import operator

"""
NO LOOPS
NO LIST COMPREHENSIONS (Still uses loops)
ONLY HIGHER ORDER FUNCTIONS (built-in)
"""
    
def main():
    #readlines() returns a list
    #read() reads the entire input
    #map() and filter() return new lists based on the elements they have modified from the original list
    #COMMAND = python a21-model-py.py < a21-inp1.txt > a21-outp1-test.txt

    inp = sys.stdin.read() #read the entire text
    removeEscChars = inp.replace("\r\n", " ") #get rid of the escape characters
    splitInput = removeEscChars.split(" ") #get rid of the spaces
    noSpaces = filter(lambda z: z != "", splitInput) #get rid of the spaces again
    
    try:
        nums = map(lambda n: int(n), noSpaces) #convert the numbers from strings to integers
        #separate the odd numbers from the even ones
        odds = list(filter(lambda o: o % 2 != 0, nums))
        evens = list(filter(lambda e: e % 2 == 0, nums))
        #half the even numbers
        halvedEvens = list(map(lambda h: h // 2, evens))

        final = odds + halvedEvens #combine the halved evens and odd numbers

        print(sum(list(dict.fromkeys(final)))) #get rid of the duplicates

    except ValueError as x:
        print("*** {}".format(x))


main()


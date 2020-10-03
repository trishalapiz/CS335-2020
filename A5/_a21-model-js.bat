@set PROMPT=$G

node a21-model-js.js < a21-inp1.txt > a21-outp1-test.txt
fc a21-outp1.txt a21-outp1-test.txt

node a21-model-js.js < a21-inp2.txt > a21-outp2-test.txt
fc a21-outp2.txt a21-outp2-test.txt

node a21-model-js.js < a21-inp3.txt > a21-outp3-test.txt
fc a21-outp3.txt a21-outp3-test.txt

node a21-model-js.js < a21-inp5.txt > a21-outp5-test.txt
fc a21-outp5-js.txt a21-outp5-test.txt

pause

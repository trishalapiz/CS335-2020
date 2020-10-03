@set PROMPT=$G

python a21-model-py.py < a21-inp1.txt > a21-outp1-test.txt
fc a21-outp1.txt a21-outp1-test.txt

python a21-model-py.py < a21-inp2.txt > a21-outp2-test.txt
fc a21-outp2.txt a21-outp2-test.txt

python a21-model-py.py < a21-inp3.txt > a21-outp3-test.txt
fc a21-outp3.txt a21-outp3-test.txt

python a21-model-py.py < a21-inp5.txt > a21-outp5-test.txt
fc a21-outp5-py.txt a21-outp5-test.txt

pause

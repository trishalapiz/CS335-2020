@set PROMPT=$G

dotnet build a21-model-cs.csproj
@pause

rem dotnet run -p a21-model-cs.csproj < a21-inp1.txt > a21-outp1-test.txt
dotnet .\bin\Debug\netcoreapp3.1\a21-model-cs.dll < a21-inp1.txt > a21-outp1-test.txt
fc a21-outp1.txt a21-outp1-test.txt

rem dotnet run -p a21-model-cs.csproj < a21-inp2.txt > a21-outp2-test.txt
dotnet .\bin\Debug\netcoreapp3.1\a21-model-cs.dll < a21-inp2.txt > a21-outp2-test.txt
fc a21-outp2.txt a21-outp2-test.txt

rem dotnet run -p a21-model-cs.csproj < a21-inp3.txt > a21-outp3-test.txt
dotnet .\bin\Debug\netcoreapp3.1\a21-model-cs.dll < a21-inp3.txt > a21-outp3-test.txt
fc a21-outp3.txt a21-outp3-test.txt

rem dotnet run -p a21-model-cs.csproj < a21-inp5.txt > a21-outp5-test.txt
dotnet .\bin\Debug\netcoreapp3.1\a21-model-cs.dll < a21-inp5.txt > a21-outp5-test.txt
fc a21-outp5-cs.txt a21-outp5-test.txt

pause

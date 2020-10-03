#!/bin/bash

set +v
function pause () {
    read -n1 -p "Press any key to continue . . ."
    echo
}

set -v
dotnet build a21-model-cs.csproj
set +v
pause

# dotnet run -p a21-model-cs.csproj < a21-inp1.txt > a21-outp1-test.txt
dotnet ./bin/Debug/netcoreapp3.1/a21-model-cs.dll < a21-inp1.txt > a21-outp1-test.txt
diff a21-outp1.txt a21-outp1-test.txt
echo a21 case 1 : $?

# dotnet run -p a21-model-cs.csproj < a21-inp2.txt > a21-outp2-test.txt
dotnet ./bin/Debug/netcoreapp3.1/a21-model-cs.dll < a21-inp2.txt > a21-outp2-test.txt
diff a21-outp2.txt a21-outp2-test.txt
echo a21 case 2 : $?

# dotnet run -p a21-model-cs.csproj < a21-inp3.txt > a21-outp3-test.txt
dotnet ./bin/Debug/netcoreapp3.1/a21-model-cs.dll < a21-inp3.txt > a21-outp3-test.txt
diff a21-outp3.txt a21-outp3-test.txt
echo a21 case 3 : $?

# dotnet run -p a21-model-cs.csproj < a21-inp5.txt > a21-outp5-test.txt
dotnet ./bin/Debug/netcoreapp3.1/a21-model-cs.dll < a21-inp5.txt > a21-outp5-test.txt
diff a21-outp5-cs.txt a21-outp5-test.txt
echo a21 case 5 : $?

pause

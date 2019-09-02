# race-condition-mongodb
<p>A example of Race Condition using NodeJS and MongoDB</p>

### Race Condition
"A race condition or race hazard is the condition of an electronics, software, or other system where the system's substantive behavior is dependent on the sequence or timing of other uncontrollable events. It becomes a bug when one or more of the possible behaviors is undesirable. 
Race conditions can occur especially in logic circuits, multithreaded or distributed software programs." - [Wikipedia](https://en.wikipedia.org/wiki/Race_condition)

### Know the Project
1. The file called `vulnerable.js` is the server without the fix
2. The file called `notVulnerable.js` is the server with the fix
3. The file called `exploit.py` is the code used to exploit the vulnerability

### The Application
<p>This application simulate a normal register system, where a e-mail can be used in only one account. The vulnerability allows a user to register more than one account with the same e-mail address.</p>

### How to Use
You need to have NodeJS, NPM and MongoDB (docker works too :p) installed on your machine
1. clone this rep (git clone https://github.com/vitor-fernandes/race-condition-mongodb)
2. go to directory (cd race-condition-mongodb)
3. install the modules used by app (npm install)
4. execute the server (node vulnerable.js or node notVulnerable.js)
5. exploit the vulnerability (python exploit.py YOUR_IP EMAIL PASSWORD)

### Impact on Application
The impact of exploit the vulnerability is that multiple accounts will be created with same e-mail. 
To see that, open your mongodb, go to the database and see the collection that has been created.

### Fix
To fix this vulnerability a Queueing function has been implemented.

### Todo
I will make a docker container with the 2 servers running on same time on different ports :)

// Platform             : GitHub
// Course Name          : api-testing-with-postman
// Company              : Go Digit General Insurance Limited
// Author               : Deepjyoti Barman
// Designation          : QA Analyst
// Date                 : April 19 (Sunday), 2020




// Single status code assertion using code identifier
// Snippet - Status code: Code is 200
// Type - 1
pm.test("Validate if the response status code is 200", function() {
    pm.response.to.have.status(200);
});

// Type - 2
tests["Validate if the response status code is 200"] = responseCode.code === 200;


// ------------------------------------------------------------------------------------------------------


// Multiple status code assertion using code identifier
// Snippet - Status code: Successful POST request
pm.test("Validate if the response status code is either 201 or 202", function () {
    pm.expect(pm.response.code).to.be.oneOf([201,202]);
});


// ------------------------------------------------------------------------------------------------------


// Single status code assertion using code name
// Snippet - Status code: Code name has string
// Type - 1
pm.test("Validate if the response status is 'OK'", function () {
    pm.response.to.have.status("OK");
});

// Type - 2
tests["Validate if the response status is 'OK'"] = responseCode.name === "OK";


// ------------------------------------------------------------------------------------------------------


// Combining multiple assertions in a single test
// Type - 1
pm.test("Validate if the response status code is 200 and status is 'OK'", function () {
    // Checks if response status code identifier is 200
    pm.response.to.have.status(200);

    // Checks if the response status is 'OK'
    pm.response.to.be.ok;
});

// Type - 2
pm.test("Validate if the response status code is 200, response is without any error and response status is not 'Bad Request'", function () {
    // Checks if response status code is 200
    pm.response.to.have.status(200);

    // Checks if the response is without any error
    pm.response.to.not.be.error;

    // Checks if the response status is not 'Bad Request'
    pm.response.to.not.be.badRequest;
});


// ------------------------------------------------------------------------------------------------------


// Response time assertion
// Snippet - Response time is less than 200ms
// Type - 1
pm.test("Validate if response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// Type - 2
pm.test("Validate if response time is greater than 100ms", function () {
    pm.expect(pm.response.responseTime).to.be.above(100);
});


// ------------------------------------------------------------------------------------------------------


// Response header assertion
// Snippet - Response headers: Content-Type header check
// Type - 1
pm.test("Validate if the response has 'Content-Type' in the header", function () {
    pm.response.to.have.header("Content-Type");    
});

// Type - 2
pm.test("Validate if the response has 'X-Cache' in the header", function () {
    pm.response.to.have.header("X-Cache");
});


// ------------------------------------------------------------------------------------------------------


// Response Content-Type (in header) assertion
// Snippet - Response headers: Content-Type header check
// Type - 1
pm.test("Validate if Content-Type in the response header has value 'application/json'", function () {
    pm.expect(pm.response.headers.get("content-type")).to.include("application/json");
});


// Type - 2
pm.test("Validate if the response has 'Content-Type' in the header and the value for Content-Type is 'application/json; charset=utf-8", function () {
    // Initially checks if the response has 'Content-Type' in the header
    pm.response.to.have.header("Content-Type");

    // Later checks if 'Content-Type' present in the response header has exact value 'application/json; charset=utf-8'
    pm.expect(pm.response.headers.get("Content-Type")).to.eql("application/json; charset=utf-8");
});


// ------------------------------------------------------------------------------------------------------


// Response cookie exists or not assertion
pm.test("Validate if cookie named '__cfduid' exists in the response", function () {
    pm.expect(pm.cookies.has("__cfduid")).to.be.true;
});


// ------------------------------------------------------------------------------------------------------


// Response cookie value assertion
pm.test("Validate if cookie named '__cfduid' has value 'dda5ad0154c1d03cb3c9bc3a724d3673d1587210678'", function () {
    pm.expect(pm.cookies.get("__cfduid")).to.eql("dda5ad0154c1d03cb3c9bc3a724d3673d1587210678");
});


// ------------------------------------------------------------------------------------------------------


// Response body assertion
// Type - 1
pm.test("Validate if the response is having a body and response is of type JSON", function () {
    // Checks if the response is having a body (not an empty body)
    pm.response.to.be.withBody;

    // Checks if the response is of type JSON
    pm.response.to.be.json;
});

// Type -2
pm.test("Validate if the response is having a body, response does not contain any string 'error' and response is not of type XML", function () {
    // Checks if the response is having a body (not an empty body)
    pm.response.to.have.jsonBody;

    // Checks if the response body does not contain any string or text 'error'
    pm.response.to.not.have.jsonBody("error");

    // Checks if the response is not of type XML
    pm.response.not.to.be.xml;
});


// ------------------------------------------------------------------------------------------------------


// Complete response body assertion
// Snippet - Response body: is equal to a string
// Demo API URL: https://reqres.in/api/login
pm.test("Validate if the response body is correct by matching it with an exact string", function () {
    pm.response.to.have.body('{"token":"QpwL5tke4Pnpja7X4"}');
});


// ------------------------------------------------------------------------------------------------------


// Response body containing a string anywhere in the body assertion
// Snippet - Response body: Contains string
// Type - 1
pm.test("Validate if response has 'Howell' anywhere in the body", function () {
    pm.expect(pm.response.text()).to.include("Howell");
});


// Type - 2
tests["Validate if response has 'Howell' anywhere in the body"] = responseBody.has("Howell");


// ------------------------------------------------------------------------------------------------------


// Response body specific key and value pair match assertion 
// Snippet - Response body: JSON value check
// Type - 1 
let jsonData = pm.response.json();

pm.test("Validate if response has first name of second employee as 'Deepjyoti'", function() {
    pm.expect(jsonData.data[1].first_name).to.eql("Deepjyoti");
});

// Type - 2
let jsonData = JSON.parse(responseBody);
tests["Validate if response has first name of second employee as 'Deepjyoti'"] = jsonData.data[1].first_name === "Deepjyoti";


// ------------------------------------------------------------------------------------------------------


// Convert XML Body to JSON
// Snippet - Response body: Convert XML body to a JSON Object
const jsonObject = xml2Json(responseBody);


// ------------------------------------------------------------------------------------------------------


// Skipping a test via scripts
// Type - 1: Simple skip
pm.test.skip("Skipping this test", function() {
    pm.response.to.have.status(200);
});


// Type - 2: Conditional skip
(2 > 1 ? pm.test.skip : pm.test)("Skipping this test", function() {
    pm.response.to.have.status(200);
});


// ------------------------------------------------------------------------------------------------------


// Failing a test via scripts without writing assertion
pm.test("Failing this test", function() {
    pm.expect.fail('This test is failed because ...');
});


// ------------------------------------------------------------------------------------------------------


// Sending simple HTTP(S) GET request in Pre-request Script or Tests section
// Tip: This plays a very important role in request chaining or property transfer
// Snippet - Send a request
// Type - 1
pm.sendRequest("https://reqres.in/api/users/4", function (err, response) {
    if (err) {
        console.log(err);
        throw new Error("Sending request from script failed");
    }
    
    // Display the response of the request made in console
    console.log(response.json());
});

// Type - 2
pm.sendRequest("https://reqres.in/api/users/4", (err, response) => {
    if (err) {
        console.log(err);
        throw new Error("Sending request from script failed");
    }
    
    // Display the response of the request made in console
    console.log(response.json());
});


// ------------------------------------------------------------------------------------------------------


// Sending full-featured HTTP(S) POST request with JSON body in Pre-request Script or Tests section
// Tip: This plays a very important role in request chaining or property transfer
// Snippet - Send a request
const jsonBodyObj = { name: 'John', age: 29 };

const options = {
    method: 'POST',
    url: 'https://httpbin.org/post',
    header: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify(jsonBodyObj)
    }
};

pm.sendRequest(options, function (err, response) {
    if (err) {
        console.log(err);
        throw new Error("Sending request from script failed");
    }
    
    // Display the response of the request made in console
    console.log(response.json());
});


// ------------------------------------------------------------------------------------------------------


// Sending full-featured HTTP(S) POST request with Form-data (Postman will add the multipart/form-data header)
// Tip: This plays a very important role in request chaining or property transfer
// Snippet - Send a request
const options = {
    'method': 'POST',
    'url': 'https://httpbin.org/post',
    'body': {
            'mode': 'formdata',
            'formdata': [
                {'key':'foo', 'value':'bar'},
                {'key':'bar', 'value':'foo'}
            ]
    }
};

pm.sendRequest(options, (err, response) => {
    if (err) {
        console.log(err);
        throw new Error("Sending request from script failed");
    }
    
    // Display the response of the request made in console
    console.log(response.json());
});


// ------------------------------------------------------------------------------------------------------


// COMPLEX SCRIPTING ASSERTION EXAMPLES IN POSTMAN
// Example-1: Write a script to validate if the email for 'George' is 'george.edwards@reqres.in'
// API URL: https://reqres.in/api/users?page=2

const jsonData = pm.response.json();

function validate() {
    let users = jsonData.data;
    let i;
    
    for (i = 0; i < users.length; i++) {
        if (users[i].first_name === 'George')
            break;
    }
    
    pm.expect(users[i].email).to.eql('george.edwards@reqres.in')
}

pm.test("Validate if email for 'George' is 'george.edwards@reqres.in'", validate());


// ------------------------------------------------------------------------------------------------------


// Example-2: Write a script to take the email of 'Charles Morris' from API_1, generate a random password and register this user in API_2 with pre-defined credentials and validate if registration of the user is successful or not [Demonstration of request chaining or property transfer in Postman]
// API_1 URL: https://reqres.in/api/users?page=2
// API_2 URL: https://reqres.in/api/register

// Get the email of 'Charles Morris' from response, because only defined set of users can register through this API
const jsonData = pm.response.json();
const fName = 'Charles';
const lName = 'Morris';

function getEmail() {
    let users = jsonData.data;

    for (i = 0; i < users.length; i++) {
        if (users[i].first_name === fName && users[i].last_name === lName)
            return users[i].email;
    }

    return null;
}

// Preparing the options for POST request
const eMail = getEmail();
const pass  = pm.variables.replaceIn('{{$randomPassword}}');
const options = {
    method: 'POST',
    url: 'https://reqres.in/api/register',
    header: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: {
        mode: 'raw',
        raw: {
            email: eMail,
            password: pass
        }
    }
};

// Sending POST request to the desired API
pm.sendRequest(options, function (err, response) {
    if (err) {
        console.log(err);
        throw new Error("Sending request from script failed");
    }
    
    // Display the response of the request made in console
    console.log(response.json());
    
    // Display the user details in console
    console.log("First Name : " + fName);
    console.log("Last Name  : " + lName);
    console.log("Email      : " + eMail);
    console.log("Password   : " + pass);
    
    // Validate if complete response body of the request sent through script is correct [i.e. POST request is performed without any issues]
    pm.test("Validate if 'Charles Morris' is able to register successfully", function () {
        pm.expect(response.text()).to.eql('{"id":5,"token":"QpwL5tke4Pnpja7X5"}');
    });
});


// ------------------------------------------------------------------------------------------------------

// GLOBAL VARIABLE: Allows you to access data between collections, requests, test scripts, and environments.
// USAGE: Since global variables can create confusion, you should only use them sparingly—for example to quickly test something or when your project is at a very early prototyping stage.
// Set a global variable via script
// Snippet - Set a global variable
// Type - 1
pm.globals.set("employeeId", "1");

// Type - 2
postman.setGlobalVariable("employeeId", "1");


// ------------------------------------------------------------------------------------------------------


// Get the value of a global variable via script
// Snippet - Get a global variable
// Type - 1
pm.globals.get("employeeId");

// Type - 2
postman.getGlobalVariable("employeeId");


// ------------------------------------------------------------------------------------------------------


// Clear an global variable via script
// Snippet - Clear an global variable
pm.globals.unset("employeeId");


// ------------------------------------------------------------------------------------------------------


// Clear all global variables via script
pm.globals.clear();


// ------------------------------------------------------------------------------------------------------


// COLLECTION VARIABLE: These variables are available throughout the requests in a collection and are independent of environments, so do not change based on the selected environment.
// USAGE: Collection variables are suitable if you are only using a single environment, for example for auth / URL details.
// Set an collection variable via script
pm.collectionVariables.set("uuid", "6929bb52-3ab2-448a-9796-d6480ecad36b");


// ------------------------------------------------------------------------------------------------------


// Get the value of an collection variable via script
pm.collectionVariables.get("uuid");


// ------------------------------------------------------------------------------------------------------


// Clear an environment variable via script
pm.collectionVariables.unset("unset");


// ------------------------------------------------------------------------------------------------------


// Clear all collection variables via script
pm.collectionVariables.clear();


// ------------------------------------------------------------------------------------------------------


// ENVIRONMENT VARIABLE: Allow yous to tailor your processing to different environments, for example local development vs testing or production. Only one environment can be active at a time.
// USAGE: If you only have one environment, using collection variables is more efficient.
// Set an environment variable via script
// Snippet - Set an environment variable
// Type - 1
pm.environment.set("base_url", "https://www.reqres.in");

// Type - 2
postman.setEnvironmentVariable("base_url", "https://www.reqres.in");


// ------------------------------------------------------------------------------------------------------


// Get the value of an environment variable via script
// Snippet - Get an environment variable
// Type - 1
pm.environment.get("base_url");

// Type - 2
postman.getEnvironmentVariable("base_url");


// ------------------------------------------------------------------------------------------------------


// Clear an environment variable via script
// Snippet - Clear an environment variable
pm.environment.unset("base_url");


// ------------------------------------------------------------------------------------------------------


// Clear all environment variables via script
pm.environment.clear();


// ------------------------------------------------------------------------------------------------------

// LOCAL VARIABLE: These variables are temporary, and only accessible in your request scripts. Local variable values are scoped to a single request or collection run, and are no longer available when the run is complete.
// Usage: Local variables are suitable if you need a value to override all other variable scopes but do not want the value to persist once execution has ended.
// Setting a local variable via script
pm.variables.set("size", "4");


// ------------------------------------------------------------------------------------------------------


// Getting a Local variable via script
// Snippet - Get a variable
pm.variables.get("size");


// ------------------------------------------------------------------------------------------------------

/*
NOTES:
------
- DATA VARIABLES: It comes from external CSV and JSON files to define data sets you can use when running collections via Newman or the Collection Runner.
    -> Setting Data variables via CSV file, content of the CSV file is given below:

        endpoint,email,password
        /api/users,george@gmail.com,ab12c3u
        /api/users,derik@outlook.com,x2y9z51
        /api/users,justin@yahoo.com,n72ji0t

    -> Setting Data variables via JSON file, content of the JSON file is given below:

        [
            {
                "endpoint": "/api/users",
                "email": "george@gmail.com",
                "password": "ab12c3u"

            },
            {
                "endpoint": "/api/users",
                "email": "derik@outlook.com",
                "password": "x2y9z51"

            },
            {
                "endpoint": "/api/users",
                "email": "justin@yahoo.com",
                "password": "n72ji0t"
            }
        ]

    -> Getting Data variables via script

        // Type - 1
        data.endpoint

        // Type - 2
        data["email"]

        // Type - 3
        pm.iterationData.get("password")


- Variable preference is in following order when different type of variables are having same name:
    -> Temporary / Local variable (highest) > Data variable > Environment variable > Collection variable > Global variable (lowest)


- In case of Global, Collection, Environment variable:
    -> You can add and edit variables at any time.
    -> All you need to include for a new variable is a name—you can choose to supply an initial value but can alternatively set it later, including from scripts.
    -> Use the checkbox to enable or disable a variable.
    -> Initial values are shared when you share a collection or environment.
    -> Current values are local and not synced or shared.
    -> You can set response body values to any of these variables by selecting text, right-clicking / CTRL + clicking, and choosing the relevant variable by name.
    -> When you edit Global, Collection, and Environment variables in Postman, you will see Current Value, Persist, and Reset options for individual variables and for all variables.
        a. These allow you to control what happens within your local instance of Postman, independently of how the data is synced with anyone you're sharing requests, collections, and environments with.
        b. Persist: When you create or edit a variable, you can enter both an initial and a current value. You can choose to leave the current value empty, in which case it will default to the initial value. If you specify a current value, it will be local only to your instance—the Persist option lets you push your current value to the shared data, updating the initial value to match the current value. Using Persist will make your current value sync with Postman's servers and be reflected for anyone sharing your collection or environment.
        c. Reset: To reset your current local values to reflect the initial (shared) values, use Reset.


- Dynamic Variables: Dynamic variables are a list of variables whose values are randomly generated during the request/collection run.
    -> All dynamic variables can be combined with strings, in order to generate dynamic / unique data.
    -> example: $randomUUID, $timestamp, $randomAlphaNumeric, $randomInt, $randomColor, $randomIP, $randomHexColor, $randomFirstName, $randomFullName etc.
    -> To use dynamic variables in JSON body, you need to use:
        
        {
            "name": "John Doe", 
            "email": "john.doe.{{$timestamp}}@example.com"
        }

    -> To use dynamic variables in pre-request or test scripts, you need to use:

        pm.variables.replaceIn('{{$randomFirstName}}');


- To get globally accessible collection URL:
    -> Collection Name -> ... -> Share Collection -> Get Link -> Get Link / Update Link


- Request chaining / property transfer: Write a script to extract a JSON data from the response of an API then, then use it as an input / refer it in another API request (Directly or by setting the JSON data as Collection / Environment / Global variable)


- Newman: Tool to run tests from command line
    Syntax:
        newman run <collection_file_path> -n <no_of_iterations> -e <environment_variables_file_path> -g <global_variables_file_path> -d <test_data> -reporter <reporter_name> --delay-request <delay_between_requests_in_ms> --verbose
    Example:
        -> newman run MyCollection.postman_collection.json -n 5 -e MyEnvironment.postman_environment.json -g MyGlobals.postman_globals.json -d testData.csv -reporter cli.html --delay-request 1000 --verbose

        -> newman run -h (To display all the 'run' options and their respective actions in newman)

        -> newman run "global_url" (We can also run a collection in newman using globally accessible collection URL)


- 'Pre-request Scripts' section executes before sending the request, whereas 'Tests' section executes after receiving the response.


- Postman Console is generally used for Debugging purposes. Different statements that can be used to log on the Postman Console are:
    -> console.log()
    -> console.info()
    -> console.warn()
    -> console.error()


- App Debug Logs (View -> Developer -> Show DevTools (Current View)) is used for deep level of debugging purposes.


- USEFUL TOOLS AND SITES TO VIEW, PARSE, BEAUTIFY, EXTRACT OR EVEN ESCAPE JSON DATA:
    -> If you want to parse large JSON responses its better to take the help of JSON Viewer available at: http://jsonviewer.stack.hu/. If square brackets [] are found while viewing JSON response in JSON Viewer you need to parse the response via indexes.

    -> To find the path of a JSON variable in response you may use: http://jsonpathfinder.com/ (also available in Google Chrome plugin store as  JSON Path Finder)

    -> To format JSON data in text / tree / code and many other format + parse JSON data you may use: https://jsonformatter.org/json-parser

    -> To escape ', "", \ present in a JSON string you may use: https://www.freeformatter.com/json-escape.html

    -> To extract a bunch of JSON data from the response (having same key) in an array you may use, 
        - Jayway JSONPath Evaluator  :  https://jsonpath.herokuapp.com/
        - JSONPath Expression Tester :  https://jsonpath.curiousconcept.com/
        - JSONPath Online Evaluator  :  https://jsonpath.com/
        - For tutorials visit on JSONPath: [https://www.npmjs.com/package/jsonpath], [https://devqa.io/perf/parse-json-response-using-jmeters-json-extractor/], [https://goessner.net/articles/JsonPath/]


- When to use pm.response.json():
    - When you want to traverse the API response and perform key value pair check/validation
    - You want to access the value of a particular key present in the response

    (Disadvantage)
    It is not a good idea to use this method 
    - When the response is too big.
    - If the response is having arrays and the position of objects present in the array is dynamic.


- When to use pm.response.text():
    - When you want to check if a particular string is present in the response body or not / it is a part of the response body or not.


- URL on extra learning materials on Postman:
    -> Postman variables: https://learning.postman.com/docs/postman/variables-and-environments/variables-list/
    -> Postman dynamic variables list: https://learning.postman.com/docs/postman/variables-and-environments/variables-list/
    -> Postman collection runner: https://blog.postman.com/using-csv-and-json-files-in-the-postman-collection-runner/
    -> Postman test scripts: https://learning.postman.com/docs/postman/scripts/test-scripts/
    -> Postman test examples: https://learning.postman.com/docs/postman/scripts/test-examples/
    -> Postman cheatsheet: https://postman-quick-reference-guide.readthedocs.io/en/latest/cheatsheet.html
*/
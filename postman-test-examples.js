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
pm.test("Validate if the response status code is 'OK'", function () {
    pm.response.to.have.status("OK");
});

// Type - 2
tests["Validate if the response status code is 'OK'"] = responseCode.name === "OK";


// ------------------------------------------------------------------------------------------------------


// Combining multiple assertions in a single test
// Type - 1
pm.test("Validate if the response status code identifier is 200, status code name is 'OK', response is having a body and response is of JSON type", function () {
    // Checks if response status code identifier is 200
    pm.response.to.have.status(200);

    // Checks if the response status code name is 'OK'
    pm.response.to.be.ok;

    // Checks if the response is having a body (not an empty body)
    pm.response.to.be.withBody;

    // Checks if the response is of type JSON
    pm.response.to.be.json;
});

// Type - 2
pm.test("Validate if the response status code identifier is 200, response is without any error, response is having a body and response does not contain any text with 'error'", function () {
    // Checks if response status code is 200
    pm.response.to.have.status(200);

    // Checks if the response is without any error
    pm.response.to.not.be.error;

    // Checks if the response is having a body (not an empty body)
    pm.response.to.have.jsonBody;

    // Checks if the response body is not containing any string or text with 'error'
    pm.response.to.not.have.jsonBody("error");
});


// ------------------------------------------------------------------------------------------------------


// Response time assertion
// Snippet - Response time is less than 200ms
pm.test("Validate if response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});


// ------------------------------------------------------------------------------------------------------


// Response Content-Type assertion
// Snippet - Response headers: Content-Type header check
// Type - 1
pm.test("Validate if Content-Type in the response header has value 'application/json'", function () {
    pm.expect(pm.response.headers.get("content-type")).to.include("application/json");
});


// Type - 2
pm.test("Validate if value for Content-Type in the response header is 'application/json; charset=utf-8'", function () {
    // Initially checks if the response has 'Content-Type' in the header
    pm.response.to.have.header("Content-Type");

    // Later checks if 'Content-Type' present in the response header has exact value 'application/json; charset=utf-8'
    pm.expect(pm.response.headers.get("Content-Type")).to.eql("application/json; charset=utf-8");
});


// ------------------------------------------------------------------------------------------------------


// Response containing a string anywhere in the body assertion
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


// GLOBAL VARIABLE: Allows you to access data between collections, requests, test scripts, and environments.
// USAGE: Since global variables can create confusion, you should only use them sparingly—for example to quickly test something or when your project is at a very early prototyping stage.
// Setting a global variable via script
// Snippet - Set a global variable
// Type - 1
pm.globals.set("employeeId", "1");

// Type - 2
postman.setGlobalVariable("employeeId", "1");


// ------------------------------------------------------------------------------------------------------


// Getting the value of a global variable via script
// Snippet - Get a global variable
// Type - 1
pm.globals.get("employeeId");

// Type - 2
postman.getGlobalVariable("employeeId");


// ------------------------------------------------------------------------------------------------------


// Un-setting an global variable via script
// Snippet - Clear an global variable
pm.globals.unset("employeeId");


// ------------------------------------------------------------------------------------------------------

// ENVIRONMENT VARIABLE: Allow yous to tailor your processing to different environments, for example local development vs testing or production. Only one environment can be active at a time.
// USAGE: If you only have one environment, using collection variables is more efficient.
// Setting an environment variable via script
// Snippet - Set an environment variable
// Type - 1
pm.environment.set("base_url", "https://www.reqres.in");

// Type - 2
postman.setEnvironmentVariable("base_url", "https://www.reqres.in");


// ------------------------------------------------------------------------------------------------------


// Getting the value of an environment variable via script
// Snippet - Get an environment variable
// Type - 1
pm.environment.get("base_url");

// Type - 2
postman.getEnvironmentVariable("base_url");


// ------------------------------------------------------------------------------------------------------


// Un-setting an environment variable via script
// Snippet - Clear an environment variable
pm.environment.unset("base_url");


// ------------------------------------------------------------------------------------------------------

// COLLECTION VARIABLE: These variables are available throughout the requests in a collection and are independent of environments, so do not change based on the selected environment.
// USAGE: Collection variables are suitable if you are only using a single environment, for example for auth / URL details.
// Setting an collection variable via script
pm.collectionVariables.set("uuid", "6929bb52-3ab2-448a-9796-d6480ecad36b");


// ------------------------------------------------------------------------------------------------------


// Getting the value of an collection variable via script
pm.collectionVariables.get("uuid");


// ------------------------------------------------------------------------------------------------------


// Un-setting an environment variable via script
pm.collectionVariables.unset("unset");


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
        data.email

        // Type - 2
        data["password"]

- Newman: Tool to run tests from command line
    Syntax:
        newman run <collection_file_path> -n <no_of_iterations> -e <environment_variables_file_path> -g <global_variables_file_path> -d <test_data> -reporter <reporter_name> --delay-request <delay_between_requests_in_ms> --verbose
    Example:
        newman run MyCollection.postman_collection.json -n 5 -e MyEnvironment.postman_environment.json -g MyGlobals.postman_globals.json -d testData.csv -reporter cli.html --delay-request 1000 --verbose

- URL on extra learning materials on Postman:
    -> Postman variables: https://learning.postman.com/docs/postman/variables-and-environments/variables-list/
    -> Postman dynamic variables list: https://learning.postman.com/docs/postman/variables-and-environments/variables-list/
    -> Postman collection runner: https://blog.postman.com/using-csv-and-json-files-in-the-postman-collection-runner/
    -> Postman test scripts: https://learning.postman.com/docs/postman/scripts/test-scripts/
    -> Postman test examples: https://learning.postman.com/docs/postman/scripts/test-examples/
*/
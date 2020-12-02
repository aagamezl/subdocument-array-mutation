# Backend Take Home:
## Subdocument Array Mutation - Prompt

# Overview
The company uses a document database (amongst other storage solutions) to store high volume application data. Often, the application needs to manage an array of objects (i.e. posts, mentions) which get stored as properties of a root JSON document. For example, a content creator on the company platform can be responsible for producing social posts as part of their relationship with the brands.

Here in the example document below:

* _id is generated upon document insertion and managed the database
management system (DBMS)
* Both "posts" and "mentions" are subdocument arrays because they are made
up of objects each having their own _id.
* Subdocument arrays can be nested as shown with the "mentions" structure
under an individual "post".

```javascript
{
  _id: 1,
  name: 'Johnny Content Creator',
  posts: [
    {
      _id: 2,
      value: 'one',
      mentions: []
    },
    {
      _id: 3,
      value: 'two',
      mentions: [
        {
          _id: 5,
          text: 'apple'
        },
        {
          _id: 6,
          text: 'orange'
        }
      ]
    },
    {
      _id: 4,
      value: 'three',
      mentions: []
    }
  ]
}
```

## DBMS Supported Operations
The document database we are using supports the following operations for
subdocument arrays:

* **$add:** adding new subdocument to the end of an array
* **$remove:** removing specific subdocuments by index (zero-based)
* **$update:** updating specific subdocuments by index (zero-based)

# What you need to build
Individual items in subdocument arrays need to be added/removed/deleted independently to support application users making concurrent updates.

Write a generic routine named ***generateUpdateStatement*** that accepts as input:

* **original document** (like the one above)
* a **mutation** that describes only what needs updating in the original document

....and outputs

* an **update statement** following the Examples below:

## Examples: Input Mutations & Output Update Statements

### **Updates to specific fields:**

```javascript
//INPUT: Update value field of post with _id of 2
{ "posts": [ { "_id": 2, "value": "too" } ] }
//OUTPUT: Update value field of post at index 0
{ "$update": { "posts.0.value": "too" } }
//INPUT: Update text field in mention with _id of 5, for post with _id of 3
{ "posts": [ { "_id": 3, "mentions": [ { "_id": 5, "text": "pear" } ] } ] }
//OUTPUT: Update text field in mention at index 1, for post at index 0
{ "$update": { "posts.1.mentions.0.text": "pear" } }`
```

### **Appending to existing arrays:**

NOTE: Documents being added **do not** have an _id yet; the _id get's assigned by the DBMS at the time of item insertion.

```javascript
//INPUT: Add post; notice that there is no _id because the post doesn't exist yet
{"posts": [{"value": "four"}] }
//OUTPUT: Add post
{ "$add": { "posts": [ {"value": "four" } ] }}
//INPUT: Add mention to post with _id of 3
{ "posts": [ { "_id": 3, "mentions": [ { "text": "banana" } ] } ] }
//OUTPUT: Add mention for post at index 2
{ "$add": { "posts.1.mentions": [ { "text": "banana" } ] } }
```

### **Removing existing items:**

```javascript
//INPUT: Remove post with _id of 2
{ "posts": [ {"_id": 2, "_delete": true} ] }
//OUTPUT: Remove post at index 0
{ "$remove" : { "posts.0" : true } }
//INPUT: Remove mention with _id of 6, for post with _id of 3
{ "posts": [ { "_id": 3, "mentions": [ { "_id": 6, "_delete": true } ] } ] }
//OUTPUT: Remove mention at index 1, for post at index 1
{ "$remove" : { "posts.1.mentions.1": true } }
```

### **Removing existing items:**

```javascript
//INPUT:
{
  "posts": [
    { "_id": 2, "value": "too" },
    { "value": "four" },
    { "_id": 4, "_delete": true }
  ]
}
//OUTPUT:
{
  "$update": { "posts.0.value": "too" },
  "$add": { "posts": [ { "value": "four" } ] },
  "$remove" : { "posts.1" : true }
}
```

# Assumptions

* All mutations inputted are for subdocument arrays; don't worry about nonarray fields (i.e. "name" in root document) or arrays of simple data types (i.e [1, 2, 3, 4]

* "_delete" is a special field name for document removal and you will not
receive values other than "true" as input

* Don't worry about multiple (conflicting) statements that modify the same
document

```javascript
//INPUT that does not need to be supported:
{
  "posts": [
    { "_id": 2, "value": "too" },
    { "_id": 2, "_delete": true }
  ]
}
```

# Rules & Requirements

* Write your solution in JavaScript running in a NodeJS instance. Feel free to use a starter such as [https://github.com/app-generator/nodejs-starter](https://github.com/app-generator/nodejs-starter) or
similar.

* Include whatever driver code (i.e. unit tests) you use to execute your
**generateUpdateStatement** method.

* In order to submit the project, please upload your application to a public
Github repository and reply to the email that sent you this project with a link to the Github repository.

* We recognize that you may not have much time to work on making it perfect,
so we are only expecting you to spend between 2 and 4 hours. If you are not
able to complete the solution to your satisfaction, we highly recommend you
to include a list of changes and improvements you would make if you had
more time in the project README.

* **Your solution should work for any type of document with subdocument
arrays, not just for the example structure above!**

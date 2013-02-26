---
datestring: "February 27th 2013"
datetime: "2013-02-27"
layout: "default"
ignore: true
write: false
title: "Generating Amazon Web Service S3 credentials with Node.js"
subheading: ""
---

**I recently began working on a project where I needed to upload files to Amazon Web Services’ S3.** All I wanted was to do was sign a JSON file and get the policy and signature needed - I didn't want an SDK as I was performing the actual upload on the client-side. I just wanted to generate the creds with Node.js to stop the secret key from being stored on the client-side. I chose Node.js because the client-side app is served from Node.js.

## Getting Started
You'll need [Node.js](https://github.com/joyent/node/wiki/Installation) and an [AWS](http://aws.amazon.com/) account.

``` javascript
  var AWS_KEY    = 'YOUR_AWS_KEY',
      AWS_SECRET = 'YOUR_AWS_SECRET',
      AWS_BUCKET = 'YOUR_AWS_BUCKET',
      crypto     = require('crypto'),
      moment     = require('moment');
```
[Crypto](http://nodejs.org/api/crypto.html) is a powerful core Node module that encapsuates secure credentials. [Moment](http://momentjs.com/) is an optional Node module that makes it easy to generate string formatted dates.

## Policy and Signature
The two main requirements that are needed for creating the AWS S3 credentials are the [policy](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucketPolicies.html) and the [signature](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).

The policy handles the authorization and access control of who, what, when, and how files can be uploaded and how long the files are stored before expiring.

The signature provides the authentication for S3 to confirm that the client or server is allowed upload/view files.

## Creating the Policy
The policy is defined from many parameters - in this example it is set from an expiration and a few conditions. Differnet policies can be used for different files.

``` javascript
  var policy = function() {

    var format = 'YYYY-MM-DDTHH:mm:ss\\Z',
        s3Policy = {
          expiration: moment.utc().add('years', 10).format(format),
          conditions: [
            { bucket: AWS_BUCKET },
            { acl: 'public-read' },
            { success_action_status: '201' },
            [ 'starts-with', '$key', '' ]
          ]
        };

    return new Buffer(JSON.stringify(s3Policy)).toString('base64');
  };
```

I used Moment to make it easy to set an expiration for the policy. In this example, any file uploaded with this policy will not expire until 10 years from today.

### Required policies
In the conditions array, I gave it four parameters:

* `bucket` is the name of the bucket this policy belongs to.
* `acl` is what the file(s) permission is - in this example, it can be accessed publicy in a read state but cannot be written to publicly.
* `success_action_status` lets you override what the success status is once a file is uploaded. By default, when you POST to S3 to create a new file, it comes back as a 204, but I like *using 201.
* `'starts-with', '$key'` is used to check and see if a file starts with the value passed in. I don't pass in a value in this example so it accepts any file.

### A couple of optional policies
You could also pass in these policies (they are not in this example).

`['starts-with', '$Content-Type', '']` is a parameter that can be used to make sure only certain file types are allowed to be uploaded. An example could be only images:

```
  ['starts-with', '$Content-Type', 'image/'']
```

`['starts-with', '$x-amz-meta-XYZ', 'ABC']` is how you could pass in a custom header. This is commonly used when you have a server that pulls down files from S3 and requires files to have a certain header (think a streaming server).

## Creating the signature

``` javascript
  var signature = function(policy) {
    return crypto.createHmac('sha1', AWS_SECRET).update(policy).digest('base64');
  };
```

Thanks to Node's Crypto, creating the signature is pretty easy.

## Creating the credentials from the policy and signature

``` javascript
  var p = policy(),
      s = signature(p);

  var creds = {
    signature: s,
    policy: p,
    key: AWS_KEY,
    bucket: AWS_BUCKET
  };
```
At this point you can pass your credentials to the client and plug them into to whatever code is responsible for uploading the files on the front-end.

## All together
``` javascript
  var AWS_KEY    = 'YOUR_AWS_KEY',
      AWS_SECRET = 'YOUR_AWS_SECRET',
      AWS_BUCKET = 'YOUR_AWS_BUCKET',
      crypto     = require('crypto'),
      moment     = require('moment');

  var policy = function() {

    var format = 'YYYY-MM-DDTHH:mm:ss\\Z',
        s3Policy = {
          expiration: moment.utc().add('years', 10).format(format),
          conditions: [
            { bucket: AWS_BUCKET },
            { acl: 'public-read' },
            { success_action_status: '201' },
            [ 'starts-with', '$key', '' ]
          ]
        };

    return new Buffer(JSON.stringify(s3Policy)).toString('base64');
  };

  var signature = function(policy) {
    return crypto.createHmac('sha1', AWS_SECRET).update(policy).digest('base64');
  };

  var p = policy(),
      s = signature(p);

  var creds = {
    signature: s,
    policy: p,
    key: AWS_KEY,
    bucket: AWS_BUCKET
  };
```

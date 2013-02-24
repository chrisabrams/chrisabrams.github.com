var AWS_KEY    = 'YOUR_AWS_KEY',
        AWS_SECRET = 'YOUR_AWS_SECRET',
        AWS_BUCKET = 'YOUR_AWS_BUCKET',
        crypto     = require(&quot;crypto&quot;),
        moment     = require(&quot;moment&quot;);

    var policy = function() {

      var format = 'YYYY-MM-DDTHH:mm:ss\\Z',
          s3Policy = {
            expiration: moment.utc().add('years', 10).format(format),
            conditions: [
              { bucket: AWS_BUCKET },
              { acl: &quot;public-read&quot; },
              { success_action_status: '201' },
              [ &quot;starts-with&quot;, &quot;$key&quot;, &quot;&quot; ]
            ]
          };

      return new Buffer(JSON.stringify(s3Policy)).toString(&quot;base64&quot;);
    };

    var signature = function(policy) {
      return crypto.createHmac(&quot;sha1&quot;, AWS_SECRET).update(policy).digest(&quot;base64&quot;);
    };

    var p = policy(),
        s = signature(p);

    var creds = {
      signature: s,
      policy: p,
      key: AWS_KEY,
      bucket: AWS_BUCKET
    };
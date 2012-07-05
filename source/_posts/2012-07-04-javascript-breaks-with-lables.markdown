---
layout: post
title: "Javascript: Breaks with Lables"
date: 2012-07-04 22:41
comments: true
categories: [Javascript, Quick Tips]
---

Breaks are a handy feature in Javascript and we'll explore an under-utilized trick: break labels.

<!-- more -->

##What are breaks?
Break statements break loops and move onto the next body of code

``` js
for(var i = 0; i < 4; i++) {
	//loop body
	if(i == 2) break;
}

//next body of code
```

When i == 2 the loop breaks out to the next body of code.

##What are labels?
In Javascript, any statement can be labeled:

```
identifier: statement
```

For example, an if statement can be labeled:

``` js
var movies = ["Kill Bill", "Zoolander", "Anchorman"];

is_zoolander: if(movies) {
	//code logic here
}
```

##When to use break labels
Break labels are handy to loop through data and get out once you've gotten what you needed.

###For loop

``` js
var movies = ["Kill Bill", "Zoolander", "Anchorman"];

is_zoolander: if(movies) {
	for(var i = 0; i < movies.length; i++) {
		if(movies[i] === "Zoolander") break is_zoolander;

		//This statement would not run once the break statement was called
		console.log(movies[i] + " is not what you are looking for.");
	}
}
```

###If statement

``` js
var auth = "sdf8sdfskn3jknfsd8sdyfsdfsdf9sdfn"

is_auth: if(auth) {
	//This function is made up for an example
	checkAuth(auth, function(res) {
		if(res) break is_auth; //User auth passes

		//Code that would run if auth check failed
	})
}
```

###Double for loop
Ever tried to break out of an outer for loop from inside the inner for loop?

``` js
is_matching:
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			if(j == 3) break is_matching; //Breaks out of outer for loop, woo hoo!
		}
	}
```

##Conclusion
While not always needed, break labels can be very handy to break out of deeply nested loops.
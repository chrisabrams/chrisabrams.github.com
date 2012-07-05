---
layout: post
title: "Using UnderscoreJS templates: no jQuery required"
date: 2012-07-04 13:57
comments: true
categories: [Javascript, UnderscoreJS, Templating]
published: false
---

After seeing so many examples of how to use Underscore's templating with jQuery, I was curious if anyone had tried using it with just Javascript. I'll explain how to render a template into a view, pass data into the template, and how to use templates from an external source.

<!-- more -->

When I first started using Underscore's [template](http://underscorejs.org/#template), which is adapted from John Resig's [Javascript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/), my assumption was that jQuery was required. This resulted from examples such as [Backbone Tutorials: What is a view?](http://backbonetutorials.com/what-is-a-view/):

##Rendering a simple template
First I will admit the obvious: it takes longer to accomplish the same goal without jQuery, but I simply wanted to see how it would be done.

``` js
var html = document.getElementById('search_template').innerHTML; //Grab the HTML from the template
var template = _.template(html, {}); //Parse the template
var el = document.getElementById('view'); //Grab the view element

//Render the template into the view element
el.innerHTML = template;
```

``` html
<div id="view"></div>

<script type="text/template" id="search_template">
    <label>Search</label>
    <input type="text" id="search_input" />
    <input type="button" id="search_button" value="Search" />
</script>
```

##Rendering a template with data

##Using templates from an external source
It's easy to render a template that's embedded on the page, but I prefer to not have the template just chilling at the bottom of the page. I'd rather the template(s) be sitting in an external file. To do that:

###Create a .html file
Place the templates into the .html file:

``` html
<script type="text/template" id="search_template">
    <label>Search</label>
    <input type="text" id="search_input" />
    <input type="button" id="search_button" value="Search" />
</script>

<script type="text/template" id="results_template">
    <h1>Results></h1>
    <% for(var i = 0; i < results.length; results++) { //Don't hate on using .length - it's just an example
    	%><div><%= results[i] %></div><%
    }
    %>
</script>
```
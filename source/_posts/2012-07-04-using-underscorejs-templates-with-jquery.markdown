---
layout: post
title: "Using UnderscoreJS templates: with jQuery"
date: 2012-07-04 14:38
comments: true
categories: [Javascript, jQuery, UnderscoreJS, Templating]
published: false
---

To follow up on a previous article on using Underscore's template without jQuery, this time I'll show how to use it with jQuery.

###Getting the template

``` js
var template = _.template( $("#search_template").html(), {} );
```

Here the template object simply receives the HTML contents of the template in the script tag.

``` html
<script type="text/template" id="search_template">
    <label>Search</label>
    <input type="text" id="search_input" />
    <input type="button" id="search_button" value="Search" />
</script>
```

Somewhere on the page is the template.

###Rendering the template

``` js
$('#view').html(template);
```

The view element takes the template created from Underscore and renders it on the page.

``` html
<div id="#view"></div>
```

An element on the page that receives the template's rendered contents.
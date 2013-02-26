---
datestring: "February 26th 2013"
datetime: "2013-02-26"
layout: "post"
published: "true"
title: "The Coffeescript 1.5 change that wasnt mentioned but might affect your apps"
subheading: ""
snippet: "**Yesterday was a frustrating day because of the Coffeescript 1.5 update.** The apps that I work on use Grunt's core Coffeescript node module, which updated to 1.5 yesterday. I like [many others](https://github.com/jashkenas/coffee-script/issues/2715) immediately realized that the apps that once worked in 1.4 did not work in 1.5. And the worst part is that this change is not even documented in the [change log](http://coffeescript.org/#changelog) or in any [web sites](http://www.h-online.com/open/news/item/CoffeeScript-1-5-0-adds-Literate-Programming-mode-1810422.html) that covered the change. [Read more...](/blog/2013-02-26-the-coffeescript-1-5-change-not-mentioned.html)"
---

**Yesterday was a frustrating day because of the Coffeescript 1.5 update.** The apps that I work on use the Grunt team's [contrib-coffee](https://github.com/gruntjs/grunt-contrib-coffee), which updated to 1.5 yesterday. I like [many others](https://github.com/jashkenas/coffee-script/issues/2715) immediately realized that the apps that once worked in 1.4 did not work in 1.5. And the worst part is that this change is not even documented in the [change log](http://coffeescript.org/#changelog) or in any [web sites](http://www.h-online.com/open/news/item/CoffeeScript-1-5-0-adds-Literate-Programming-mode-1810422.html) that covered the change.

## So what changed?
I used to be able to say this

``` coffeescript
    @view.subview 'tags', new RelatedTagsList
      collection: tags
```

and get this as the Javascript

``` javascript
    this.view.subview('tags', new RelatedTagsList({
      collection: tags
    }));
```

but now I get this instead.

``` javascript
    this.view.subview('tags', new RelatedTagsList)({
      collection: tags
    });
```

I had to update the project I was working on to do this

``` coffeescript
    @view.subview('tags', new RelatedTagsList({
      collection: tags
    }))
      
```

which isn't a huge change (and is very similar to the Javascript output), but was annoying to go find this in the code base.

Until this change, I had found the Coffeescript compiler to be quite reliable and predictable. I just wish this had been documented as it was a very tedious problem to figure out and resolve. It doesn't change my view on Coffeescript at all - it's still my preferred way of developing on the front-end.

Thanks to [@davidkaneda](http://twitter.com/davidkaneda) for providing the above examples while working with [Team Delicious](http://twitter.com/delicious) yesterday.
---
layout: post
title:  "A (Not-Super-Technical) Designer's CLI&nbsp;Toolbox"
date:   2014-05-08 16:22:48
---

Earlier this week, I attended <a href="http://artifactconf.com">Artifact Conference</a> here in Austin. It was an intimate 2-day conference with a roster of some amazingly talented speakers. I highly recommend attending their Providence conference in September (and look at that, they have a code SENDAFRIEND for $100 off!) if you get the chance.

One of the talks I most enjoyed was by Austin's own comedic developer extraordinaire, <a href="http://daverupert.com/">Dave Rupert</a>. He gave a thorough, but not intimidating, overview of tools to make the command-line do some pretty incredible stuff. I was happy that I was mildly familiar with a lot of the tools he mentioned and excited by the things I didn't know I could be doing. While I'm probably not going to be configuring my own Grunt tasks anytime soon, I do think it's valuable to encourage other designers to start utilizing these tools.

<!--more-->

Here are some of things that I (someone who doesn't write production code) use on a regular basis:

<h3 id="grunt">Grunt</h3>

<em>The</em> hot buzzword of 2014, but for good reason! <a href="http://gruntjs.com/">Grunt</a> is a powerful tool. I couldn't go into specifics about what makes Grunt different from other taskrunners, but I do know it does all the things that I normally would forget to do when I'm frantically designing a prototype.

<h5 id="whatthismeansforadesigner">What this means for a designer:</h5>

When you hit save, everything updates. Similar to what we're used to when we save a PSD and it's just... done. This is especially important when your prototype tools become more complex and need several steps to actually update in the browser. Which brings me to my next tool...

<h3 id="jekyll">Jekyll</h3>

<a href="http://jekyllrb.com/">Jekyll</a> is something we've started using at Happy Cog to generate our project hub/pattern library. It's a static site generator. It's great to build a client project in, because once the project is over, our pattern library is a collection of static HTML pages we can give to the client, that anyone can open up.

<h5 id="whatthismeansforadesigner">What this means for a designer:</h5>

Our prototypes live within our Jekyll built hub, as do all of our deliverables, so as a designer I have to update Jekyll pages quite frequently. There are a few steps to having Jekyll generate these pages, so as I mentioned above... Grunt is great for handling all of that. Before we had Grunt setup, I would <em>always</em> forget a step to generate my pages. However, these are tools I would definitely recommend a developer helps you initially set up, there is a bit of a learning curve and by no means did I write our Jekyll pages myself. Knowing how to use and update it has been extremely helpful, though.

<h3 id="bowerwithfoundation">Bower (with Foundation)</h3>

I'm gonna be honest, I don't entirely know what <a href="http://bower.io/">Bower</a> does. I do, however, know that since I've installed it, I've found my relationship with Foundation 5 to be much easier.

<h5 id="whatthismeansforadesigner">What this means for a designer:</h5>

I use Foundation to rapidly prototype, so being able to install and get Foundation running in the command-line is faster and easier. Two very important things. I'm not a developer. I just want to open a file and start prototyping immediately after sketching, but it always seems like there are 1,000 steps between paper and browser. You can read more about installing Foundation this way <a href="http://foundation.zurb.com/docs/sass.html">here</a>.

<h2 id="honorablementions">Honorable Mentions:</h2>

<h3 id="yeoman">Yeoman</h3>

I don't use <a href="http://yeoman.io/">Yeoman</a> very often. I've only mildly dabbled in it. As you can see on their site, Yeoman works with Bower and Grunt. What I found exciting and interesting about Yeoman was using it as a jumping off point for my code. I used Yeoman, in conjunction with a Ghost generator, to create this blog.

<h5 id="whatthismeansforadesigner">What this means for a designer:</h5>

I'm someone who just stares and blinks in bewilderment when I even think of creating a site. This gave me a really easy place to start that was already an up and running site. It's nice to use for something like a blog.

<h3 id="bourbon">Bourbon</h3>

<a href="http://bourbon.io/">Bourbon</a> is something I've played around with in attempts to expand my prototyping tools. It's a Sass mixin library, generated using the command-line.

<h5 id="whatthismeansforadesigner">What this means for a designer:</h5>

If you want more control than something like Foundation can offer you for your prototypes, I would suggest looking into Bourbon. Beware that this is a tool that you have to write more code than you may anticipate, if it's not something you're super privy to.

<hr>

<h3 id="ifyourestillnotconvincedthesethingsasuperawesomeassetsfordesigners">If you're still not convinced these things a super awesome assets for designers:</h3>

I suggest you read Chris Coyier's article, <a href="http://24ways.org/2013/grunt-is-not-weird-and-hard/">Grunt for People Who Think Things Like Grunt are Weird and Hard</a> because he explains it <em>way</em> better.
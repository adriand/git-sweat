# git sweat

_git pull, push up_

## Requirements

1. Works well on mobile
2. Local storage of progress
3. Easy syntax for writing new exercise programs
4. Handle:
  a) Reps
  b) Time
  c) Quotes
  d) Pics/diagrams
5. Shows progress
6. Shows total time

## Setup

Due to the somewhat broken nature of cross-domain policies, you'll need to use a web server to run this.

### Using Thin

Install thin and rack using rubygems:

    gem install thin
    gem install rack

Start thin using the provided rackup file:

    thin -R static.ru start

Access the app at http://0.0.0.0:3000/index.html

### Using Anything Else

Just place the directory in a publicly accessible location and navigate to index.html.

To-do
-----

Simplified Markdown for the exercise programs?

Adding New Programs
-------------------

1. Add the file in programs
2. Create a link on the index page
3. Add the program to the cache.manifest file
4. Update the revision number in the cache.manifest file

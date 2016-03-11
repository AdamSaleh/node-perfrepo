# node-perfrepo

A simple node client and cli utility for [perf-repo](https://github.com/PerfCake/PerfRepo) test store.

It is currently incomplete.

To test it out, run a [docker image of perf-repo](https://github.com/PerfCake/Docker/tree/master/perfrepo)
and then try to execute:
```
node bin/cli.js -u perfrepouser -p perfrepouser1. -h http://localhost:5000 -o test -c create -j ./examples/exampleTest.json
```

You should be able to find the test description on localhost:5000/test/1
If you would like to re-run the command, edit `./examples/exampleTest.json` to have unique uid.

When you run:

```
node bin/cli.js -u perfrepouser -p perfrepouser1. -h http://localhost:3000 -o testExecution -c create -j ./examples/exampleTestExecution.json
```

you should be able to find the results of the execution of the first test on localhost:5000/exec/1
If command doesn't work for some reason, check if the testId in `./examples/exampleTestExecution.json` does point to existing test.

# BEWARE, this is very early version of the software

Done to facilitate quick integration of perf-repo with node project, 
and ability to define tests and results in json, rather then xml.

There is no format validation yet, and server errors can be unhelpful :-/

# Contributing:

1. There are no tests yet. Therefore, any contribution should
 * if it adds new entry to index.js, make sure, it works with cli.js, and add that command to readme
 * make sure all others still work with cli.js
 * if some work differently, update README.md
 
2. lint with [semistandard](https://github.com/Flet/semistandard)  
"use strict";
const markov = require("./markov");


describe("getChains", function () {
  test("all lowercase words", function () {
    let machine = new markov.MarkovMachine("the cat in the hat");
    const chain = machine.getChains();
    expect(chain).toEqual({ the: ['cat', 'hat'], cat: ['in'], in: ['the'], hat: [null] });
  });

  test("With an uppercase and a dot", function () {
    let machine = new markov.MarkovMachine("The cat in the hat.");
    const chain = machine.getChains();
    expect(chain).toEqual({
      The: ['cat'],
      cat: ['in'],
      in: ['the'],
      the: ['hat.'],
      'hat.': [null]
    });
  });
});


describe("getText", function () {
  test("no branches", function () {
    let machine = new markov.MarkovMachine("The cat in the hat.");
    const text = machine.getText();
    expect(text).toEqual("The cat in the hat.");
  });

  test("test return is string", function () {
    let machine = new markov.MarkovMachine("the cat in the hat.");
    const text = machine.getText();
    expect(text).toEqual(expect.any(String));
    expect(text).toContain("hat.");
    // checking to see if the last word ends with hat.
  });
});
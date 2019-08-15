let assert = require('assert');
let kiwi = require('../kiwiHours.js')

describe('Alarm calculation', function() {
    it('Should work in the normal case', function() {
        let current = new Date("1995-02-05T10:00Z");
        let target = new Date("1995-02-05T12:00Z");
        let targetDelay = target - current;
        let delay = kiwi.internals.calculateNextAlarm(current, "1200");
        
        assert.ok(delay > 0, "Delay was negative");
        assert.equal(targetDelay, delay, "Delay was incorrect");
    });

    it('Should move to next day if needed', function() {
        let current = new Date("1995-02-05T13:00Z");
        let target = new Date("1995-02-06T12:00Z");
        let targetDelay = target - current;
        let delay = kiwi.internals.calculateNextAlarm(current, "1200");
        
        assert.ok(delay > 0, "Delay was negative");
        assert.equal(targetDelay, delay, "Delay was incorrect");
    });

    it('Should skip wednesdays', function() {
        let current = new Date("1995-02-08T10:00Z");
        let target = new Date("1995-02-09T12:00Z");
        let targetDelay = target - current;
        let delay = kiwi.internals.calculateNextAlarm(current, "1200");
        
        assert.ok(delay > 0, "Delay was negative");
        assert.equal(targetDelay, delay, "Delay was incorrect");
    });

    it('Should skip both if needed', function() {
        let current = new Date("1995-02-07T13:00Z");
        let target = new Date("1995-02-09T12:00Z");
        let targetDelay = target - current;
        let delay = kiwi.internals.calculateNextAlarm(current, "1200");
        
        assert.ok(delay > 0, "Delay was negative");
        assert.equal(targetDelay, delay, "Delay was incorrect");
    });
});
import assert from 'assert';
import Sequencer from '../src/lib/sequencer';

describe('Sequencer', function () {

  it('should have beats', function () {
    const sequencer = new Sequencer();
    assert.ok(sequencer.beats);
  });

  it('should have sixteen beats', function () {
    const sequencer = new Sequencer();
    assert.ok(sequencer.beats['0']);
    assert.ok(sequencer.beats['15']);
  });

  it('should have notes for each beat', function () {
    const sequencer = new Sequencer();
    assert.strictEqual(sequencer.beats['0'].C3, false);
  });

  it('should apply notes passed in', function () {
    const sequencer = new Sequencer({'15': { 'C3': true }});
    assert.strictEqual(sequencer.beats['15'].C4, false);
    assert.strictEqual(sequencer.beats['15'].C3, true);
  });

  it('should apply multiple sequences', function () {
    const sequencer = new Sequencer({'15': { 'C3': true }}, {'15': { 'A4': true }});
    assert.strictEqual(sequencer.beats['15'].C4, false);
    assert.strictEqual(sequencer.beats['15'].C3, true);
    assert.strictEqual(sequencer.beats['15'].A4, true);
  });

});

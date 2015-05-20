const masterSequencer = {
  add(element, beat) {
    if (!this[beat]) { this[beat] = []; }
    this[beat].push(element);
  }
};

export default masterSequencer;

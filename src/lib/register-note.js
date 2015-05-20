export default function registerNote(socket, note, beat) {
  const box = d3.select(this);
  box.classed('on', !box.classed('on'));
}

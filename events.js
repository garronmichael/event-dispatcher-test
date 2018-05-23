function Events() {
  this.events = {};
}

Events.prototype.on = function(event, fn, scope) {

  const context = scope || this;

  if (!this.events[event]) {

    this.events[event] = {callbacks: [], scopes: []};
  }

  this.events[event].callbacks.push(fn);
  this.events[event].scopes.push(context);
};

Events.prototype.trigger = function(event) {

  const args = Array.prototype.slice.call(arguments, 1);
  const callbacks = this.events[event].callbacks;
  const scopes = this.events[event].scopes;

  if (callbacks) {

    callbacks.forEach(function(fn, idx) {
      fn.apply(scopes[idx], args);
    });
  }
};

Events.prototype.off = function(event, fn) {

  if (!fn) {
    this.events[event] = {};

    return;
  }

  const idx = this.events[event].callbacks.indexOf(fn);

  if (idx > -1) {
    this.events[event].callbacks.splice(idx, 1);
  }
};

module.exports = Events;

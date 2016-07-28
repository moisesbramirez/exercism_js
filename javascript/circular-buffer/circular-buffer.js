"use strict";

module.exports = {
  circularBuffer: circularBuffer,
  bufferEmptyException: bufferEmptyException,
  bufferFullException: bufferFullException
};

function circularBuffer(size) {
  let buffer = createBuffer(size);
  let current = 0;
  let oldest = 0;

  return {
    read: read,
    write: write,
    clear: clear,
    forceWrite: forceWrite
  };

  function read() {
    if( buffer.every(hasNoValue) ) throw bufferEmptyException();

    let val = buffer[oldest].value;
    buffer[oldest].value = null;
    oldest = buffer[oldest].next ;
    return val;
  }

  function write(value) {
    if( value === null || value === undefined ) return;
    if( buffer.every(hasValue)) throw bufferFullException();
    buffer[current].value = value;
    current = buffer[current].next;
  }

  function clear() {
    current = 0;
    buffer.map(item => item.value = null);
  }

  function forceWrite(value) {
    if( hasNoValue(buffer[current]) ) {
      write(value);
    } else {
      buffer[oldest].value = value;
      oldest = buffer[oldest].next;
    }
  }
}

function createBuffer(size) {
  let store = [];
  for(let i = 0; i < size; i++){
    store.push({ value: null, next: i + 1, prev: i - 1 });
  }
  store[0].prev = size - 1;
  store[size - 1].next = 0;
  return store;
}

function hasNoValue(item) {
  return !item.value;
}

function hasValue(item) {
  return !!item.value;
}

function bufferEmptyException() {
  return new Error("Nothing in Buffer.");
}

function bufferFullException() {
  return new Error("Buffer is full.");
}

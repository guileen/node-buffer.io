var assert = require('assert');
var Reader = require('../lib/reader');
var Writer = require('../lib/writer');

exports['test Reader Writer int8'] = function() {
    var writer = new Writer(4);
    writer.int8(0x12);
    writer.int8(0x34);
    writer.int8(0x56);
    writer.int8(0x78);
    var reader = new Reader(writer.buffer);
    assert.equal(0x12, reader.int8());
    assert.equal(0x34, reader.int8());
    assert.equal(0x56, reader.int8());
    assert.equal(0x78, reader.int8());
};


exports['test Reader Writer int16'] = function() {
    var writer = new Writer(8);
    writer.int16(0x12);
    writer.int16(0x34);
    writer.int16(0x56);
    writer.int16(0x78);
    var reader = new Reader(writer.buffer);
    assert.equal(0x12, reader.int16());
    assert.equal(0x34, reader.int16());
    assert.equal(0x56, reader.int16());
    assert.equal(0x78, reader.int16());
};


exports['test Reader Writer int32'] = function() {
    var writer = new Writer(16);
    writer.int32(0x12);
    writer.int32(0x34);
    writer.int32(0x56);
    writer.int32(0x78);
    var reader = new Reader(writer.buffer);
    assert.equal(0x12, reader.int32());
    assert.equal(0x34, reader.int32());
    assert.equal(0x56, reader.int32());
    assert.equal(0x78, reader.int32());
};

exports['test slice'] = function() {
    var writer = new Writer();
    writer.seek(4);
    assert.equal(4, writer.pos);
    writer.int8(0x50);
    assert.equal(5, writer.pos);
    writer.seek(0);
    assert.equal(0, writer.pos);
    writer.int8(0x10);
    writer.int8(0x20);
    writer.int8(0x30);
    writer.int8(0x40);
    writer.seek();
    assert.equal(5, writer.pos);
    writer.int8(0x60);
    var buff = writer.slice();
    assert.equal(6, buff.length);
    var reader = new Reader(buff);
    assert.equal(0x10, reader.int8());
    assert.equal(0x20, reader.int8());
    assert.equal(0x30, reader.int8());
    assert.equal(0x40, reader.int8());
    assert.equal(0x50, reader.int8());
    assert.equal(0x60, reader.int8());

};

exports['test Reader Writer all'] = function() {
    var writer = new Writer();
    writer.int32(0x12345678);
    writer.int16(0x1234);
    writer.int8(0x12);
    writer.write('abcdef');
    var reader = new Reader(writer.buffer);
    assert.equal(0x12345678, reader.int32());
    assert.equal(0x1234, reader.int16());
    assert.equal(0x12, reader.int8());
    assert.equal('abcdef', reader.chars(Buffer.byteLength('abcdef')));
};



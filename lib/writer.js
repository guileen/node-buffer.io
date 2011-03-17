var Writer = module.exports = function(length) {
    this.buffer = new Buffer(length || 255);
    this.pos = 0;
    this._seek_pos = 0;
};

Writer.prototype = {

    /**
     * seek to position or seek back
     * @param {int} pos if undefined, seek back to, if defined seek to position.
     */
    seek: function(pos) {
        if (pos === undefined) {
            this.pos = this._seek_pos;
        }else {
            this._seek_pos = this.pos;
            this.pos = pos;
        }
        return this;

    },

    int8: function(v) {
        this.buffer[this.pos++] = v;
        return this;
    },

    int16: function(v) {
        this.buffer[this.pos++] = v >> 8;//& 0xff;
        this.buffer[this.pos++] = v; //& 0xff;
        return this;
    },

    int32: function(v) {
        this.buffer[this.pos++] = v >> 24; //& 0xff;
        this.buffer[this.pos++] = v >> 16; //& 0xff;
        this.buffer[this.pos++] = v >> 8; //& 0xff;
        this.buffer[this.pos++] = v; //& 0xff;
        return this;
    },

    write: function(string, offset, encoding) {
        this.writeBuffer(new Buffer(string, offset, encoding));
    },

    writeBuffer: function(buff) {
        buff.copy(this.buffer, this.pos, 0, buff.length);
        this.pos += buff.length;
        return this;
    },


    slice: function(start, end) {
        end = end || this.pos;
        start = start || 0;
        return this.buffer.slice(start, end);
    }

};

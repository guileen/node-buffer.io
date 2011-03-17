var Reader = module.exports = function(buff) {
    this.buff = buff;
    this.pos = 0;
};

Reader.prototype = {

    int8: function() {
        return this.buff[this.pos++];
    },

    int16: function() {
        return this.buff[this.pos++] << 8 | this.buff[this.pos++];
    },

    int32: function() {
        return this.buff[this.pos++] << 24 | this.buff[this.pos++] << 16 | this.buff[this.pos++] << 8 | this.buff[this.pos++];
    },

    chars: function(len) {
        var end = len ? this.pos + len : this.buff.length;
        var str = this.buff.slice(this.pos, end).toString();
        this.pos = end;
        return str;
    },

    buffer: function(len) {
        var end = len ? this.pos + len : this.buff.length;
        var buff = this.buff.slice(this.pos, end);
        this.pos = end;
        return buff;
    }

};


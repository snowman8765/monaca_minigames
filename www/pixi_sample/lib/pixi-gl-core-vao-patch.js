PIXI.glCore.VertexArrayBuffer.prototype.bind = function() {
    if (this.nativeVao) {
        this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
        if(this.dirty) {
            this.dirty = false;
            this.activate();
            return this;
        }
        if (this.indexBuffer) {
            this.indexBuffer.bind();
        }
    } else {
        this.activate();
    }
    return this;
};

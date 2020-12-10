class View {
    constructor(name) {
        this.name = name
    }

    getPath(subview) {
        return this.name + "/" + subview;
    }
}

module.exports = View;
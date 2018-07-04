var root = './'
var config = module.exports = {
    path: {
        src: root,
        watch: root,
        build: root + 'build/',
        deploy: root + 'testFrom',
    }
};
config.deploy = {
    dist: {
        to: root + 'testTo',
        from: root + 'testFrom'
    }
}
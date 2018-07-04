var root = './'
var config = module.exports = {
    path: {
        src: root = 'src/',
        watch: root = 'src/',
        build: root = 'build/',
        deploy: root = '../',
    }
};
config.deploy = {
    dist: {
        to: '',
        from: ''
    }
}
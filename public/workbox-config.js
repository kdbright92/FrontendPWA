module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,gif,svg,json}'],
    swDest: 'build/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
};

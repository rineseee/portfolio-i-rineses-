(function () {
    var t = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
})();

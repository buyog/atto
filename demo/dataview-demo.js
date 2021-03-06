require.config({
    baseUrl: '../..'
});
require(["atto/core","atto/dataView"], function(atto, DataView) {
    var dview = new DataView(atto.byId("dataBound"), {
        dataUrl: 'dataPump.php?seed={id}',
        fetchMessage: 'Please wait...',
        errback: function(args) {
            atto.byId('dataBound').innerHTML = 'Unable to fetch the requested data; Error details: ' + args.reason;
        }
    });

    var links = document.querySelectorAll('li a[data-target]');
    for (var idx in links) {
        links[idx].onclick = function() {
            dview.fetch({id:this.getAttribute('data-target')});
            atto.stopEventCascade();
        }
    }
});

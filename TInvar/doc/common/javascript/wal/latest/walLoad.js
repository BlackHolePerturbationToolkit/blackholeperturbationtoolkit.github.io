if(/.*(__cookie_consent=(1|2)).*/i.test(document.cookie)){

(function(a,b,c,d,e,f,g,h){a['WolframAnalyticsObject']=f;a[f]=a[f]||function(){
                (a[f].q=a[f].q||[]).push(arguments)},a[f].q=a[f].q||[],a[f].t=1*new Date();
        a[f].d=d,a[f].v=e,g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1
        ,g.src=d+'/js/'+e+'/wal.js',h.parentNode.insertBefore(g,h)})
(window,document,'script','//wal.wolfram.com','3.0.0','wal');


wal('queue', true);
wal('batch', true);
wal('log','pageload');
wal('log','usermeta');
wal('batch', false);
wal('queue', false);


var walgcconf = {
    key:'walgc',
    levels:5,
    is:{
        el:['a','area','button'],
        attr:['data-walid']
    },
    not:{
        attr:['data-walgcexclude'],
    },
    prop:['href'],
    attr:['data-walid']
};
wal('addListener', 'click', walgcconf);
}
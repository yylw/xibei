require.config({
	paths:{
		'jquery':'lib/jquery',
        'fifty':'js/fifty',
		'combo':'js/combo',
		'restaurant':'js/restaurant',
		'message':'js/message',
		'detail':'js/detail'
	}
})
require(['combo','detail','fifty','restaurant','message'],function(){})
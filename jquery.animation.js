/**
 * jquery.animation.js
 * @author  kazuki-sato
 * @version 1.0.0
 */
(function($){
	/**
	 * cssアニメーションを実行します。(IE9以降のモダンブラウザのみ対象)
	 * @param  {String} animClass (必須)アニメーションのクラス名
	 * @param  {Function} animStart アニメーション実行前に実行されるコールバック
	 * @param  {Function} animEnd   アニメーション実行後に実行されるコールバック
	 * @return {jQuertObject}
	 */
	$.fn.animation = function(animClass, animStart, animEnd) {
		if (!animClass) return;

		var onAnimStart = function () {
			if (animStart) animStart();
		};
		var onAnimEnd = function () {
			if (animEnd) animEnd();
			$(this).unbind('animationstart webkitAnimationStart');
			$(this).unbind('animationend webkitAnimationEnd');
			$(this).removeClass('animating default-animation-config ' + animClass);
			$(this).css({
				'-webkit-animation':'',
				'-moz-animation':	'',
				'-ms-animation':	'',
				'-o-animation':		'',
				'animation':		''
			});
		};

		$(this).bind('animationstart webkitAnimationStart', onAnimStart);
		$(this).bind('animationend webkitAnimationEnd', onAnimEnd);
		$(this).addClass('animating default-animation-config ' + animClass);

		return $(this).extend({
			/**
			 * 一時停止状態のアニメーションを再開します。
			 */
			play: function () {
				$(this).css({
					'animation-play-state':			'running',
					'-o-animation-play-state':		'running',
					'-ms-animation-play-state':		'running',
					'-moz-animation-play-state':	'running',
					'-webkit-animation-play-state':	'running'
				});
				return $(this);
			},
			/**
			 * 再生状態のアニメーションを一時停止します。
			 */
			pause: function () {
				$(this).css({
					'animation-play-state':			'paused',
					'-o-animation-play-state':		'paused',
					'-ms-animation-play-state':		'paused',
					'-moz-animation-play-state':	'paused',
					'-webkit-animation-play-state':	'paused'
				});
				return $(this);
			},
			/**
			 * 指定された回数アニメーションを実行します。(デフォルトinfinite)
			 * @param  {Number} cnt 再正回数
			 */
			repeat: function (cnt) {
				var count = cnt ? String(cnt): 'infinite';
				$(this).css({
					'animation-iteration-count':			count,
					'-o-animation-iteration-count':			count,
					'-ms-animation-iteration-count':		count,
					'-moz-animation-iteration-count':		count,
					'-webkit-animation-iteration-count':	count
				});
				return $(this);
			},
			/**
			 * 状態に関わらずアニメーションを停止します。
			 */
			stop: function () {
				onAnimEnd();
				return $(this);
			}
		});
	};
})(jQuery);
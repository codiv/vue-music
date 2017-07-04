<template>
	<div class="progress-circle">
		<!--
		stroke-dasharray：表示虚线描边。
		可选值为：none, <dasharray>, inherit. 其中，none表示不是虚线；
		<dasharray>为一个逗号或空格分隔的数值列表。
		表示各个虚线端的长度。可以是固定的长度值，也可以是百分比值；inherit表继承。
		stroke-dashoffset：表示虚线的起始偏移。
		可选值为：<percentage>, <length>, inherit. 百分比值，长度值，继承。
		viewBox="x, y, width, height"  // x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度
		viewBox="0 0 100 100"：100是圆的直径（为了让圆铺满SVG的画布），
		-->
		<svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
			<circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
					:stroke-dashoffset="dashOffset"></circle>
		</svg>
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	const DIAMETER = 100 //圆的直径

	export default {
		props: {
			radius: {
				type: Number,
				default: 100
			},
			percent: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				dashArray: Math.PI * DIAMETER //圆的周长
			}
		},
		computed: {
			dashOffset() {
				return (1 - this.percent) * this.dashArray
			}
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.progress-circle
		position: relative
		circle
			stroke-width: 8px //圆的边框
			transform-origin: center
			&.progress-background
				transform: scale(0.9) //scale(0.9) 是为了保证是一个圆
				stroke: $color-theme-d
			&.progress-bar
				transform: scale(0.9) rotate(-90deg) //rotate(-90deg) 是为了从上顶点开始
				stroke: $color-theme

</style>

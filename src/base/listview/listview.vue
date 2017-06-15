<template>
	<scroll class="listview" :loadData="singer" ref="listview">
		<ul>
			<li v-for="group in singer" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class="list-group-item">
						<img class="avatar" v-lazy="item.avatar">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<!--touchstart 触摸事件是better-scroll封闭的方法-->
		<div class="list-shortcut" @touchstart="onShortcutTouchStart">
			<ul>
				<li v-for="(item,index) in shortcutList" class="item" :data-index="index">{{item}}</li>
			</ul>
		</div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/dom'

	export default {
		props: {
			singer: {
				type: Array,
				default: []
			}
		},
		created() {
			this.touch = {}
			this.listHeight = []
		},
		methods: {
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target, 'index')
				this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 400)
			}
		},
		computed: {
			shortcutList() {
				return this.singer.map((data) => { //map 遍历数据，支持return返回值
					return data.title.substr(0, 1)
				})
			}
		},
		components: {
			Scroll
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.listview
		position: relative
		width: 100%
		height: 100%
		overflow: hidden
		background: $color-background
		.list-group
			padding-bottom: 30px
			.list-group-title
				height: 30px
				line-height: 30px
				padding-left: 20px
				font-size: $font-size-small
				color: $color-text-l
				background: $color-highlight-background
			.list-group-item
				display: flex
				align-items: center
				padding: 20px 0 0 30px
				.avatar
					width: 50px
					height: 50px
					border-radius: 50%
				.name
					margin-left: 20px
					color: $color-text-l
					font-size: $font-size-medium
		.list-shortcut
			position: absolute
			z-index: 30
			right: 0
			top: 50%
			transform: translateY(-50%)
			width: 20px
			padding: 20px 0
			border-radius: 10px
			text-align: center
			background: $color-background-d
			font-family: Helvetica
			.item
				padding: 3px
				line-height: 1
				color: $color-text-l
				font-size: $font-size-small
				&.current
					color: $color-theme
		.list-fixed
			position: absolute
			top: 0
			left: 0
			width: 100%
			.fixed-title
				height: 30px
				line-height: 30px
				padding-left: 20px
				font-size: $font-size-small
				color: $color-text-l
				background: $color-highlight-background
		.loading-container
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)

</style>

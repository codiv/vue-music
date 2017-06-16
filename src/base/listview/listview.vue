<template>
	<scroll class="listview"
			:loadData="singer"
			ref="listview"
			@scroll="scroll"
			:listenScroll="listenScroll"
			:probe-type='probeType'
	>
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
		<!--
		touchstart：触摸事件是better-scroll封闭的方法
		touchmove：手指移动事件，stop/prevent是阻止事件冒泡和浏览器的原生滚动
		-->
		<div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li v-for="(item,index) in shortcutList" class="item" :data-index="index"
					:class="{'current':currentIndex===index}">{{item}}
				</li>
			</ul>
		</div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/dom'

	const ANCHOR_HEIGHT = 18 //字母元素的高

	export default {
		props: {
			singer: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				scrollY: -1,
				currentIndex: 0
			}
		},
		created() {
			this.touch = {}
			this.listHeight = []
			this.listenScroll = true
			this.probeType = 3
		},
		methods: {
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target, 'index')
				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY // 触摸时的Y值坐标
				this.touch.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex)
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY //移动时的Y值坐标
				/*
				 * delta：偏移的锚点数
				 * this.touch.y2 - this.touch.y1：取得移动的差什
				 * “ | 0”是向下取整
				 * */
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
				this._scrollTo(anchorIndex)
			},
			scroll(pos) { //滚动的时候，取得滚动时Y轴的值。
				this.scrollY = pos.y
			},
			_calculateHeight() {
				this.listHeight = []
				let list = this.$refs.listGroup
				let height = 0
				this.listHeight.push(height)
				for (let i = 0; i < list.length; i++) {
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			_scrollTo(index) {
				if (!index && index !== 0) {
					return
				}
				if (index < 0) {
					index = 0
				} else if (index > this.listHeight.length - 2) {
					index = this.listHeight.length - 2
				}
				this.scrollY = -this.listHeight[index]//滑动、点击时字母被选中的状态
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
			}
		},
		computed: {
			shortcutList() {
				return this.singer.map((data) => { //map 遍历数据，支持return返回值
					return data.title.substr(0, 1)
				})
			}
		},
		watch: {
			singer() { //singer数据变化的时候，更新一下_calculateHeight()
				//setTimeout、20秒相当于nextTick，用setTimeout为了确保浏览器的兼容性
				setTimeout(() => {
					this._calculateHeight()
				}, 20)
			},
			scrollY(newY) { //时时监测scrollY新值（newY）的变化
				const listHeight = this.listHeight
				// 当滚动到顶部，newY>0
				if (newY > 0) {
					this.currentIndex = 0
					return
				}
				// 在中间部分滚动，listHeight.length为24，元素最大的下标为22
				for (let i = 0; i < listHeight.length - 1; i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i + 1]
					if (-newY >= height1 && -newY < height2) {
						this.currentIndex = i
						return
					}
				}
				// 当滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex = listHeight.length - 2
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

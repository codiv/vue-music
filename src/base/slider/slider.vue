<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" :class="{'active':currentPageIndex===index}" v-for="(item, index) in dots"
				  @click="activePage(index)"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {addClass} from 'common/js/dom'
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				dots: [],
				currentPageIndex: 0
			}
		},
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			autoPlay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 4000
			}
		},
		mounted() {
			setTimeout(() => {
				this._setSliderWidth()
				this._initDots() //注：必须在_initSlider()方法之前执行，如果在之后并且snapLoop为true时候，children的值会多出两个
				this._initSlider()
				if (this.autoPlay) {
					this._play()
				}
			}, 20)

			window.addEventListener('resize', () => {
				if (!this.slider) {
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
			})
		},
		methods: {
			_setSliderWidth(isResize) {
				this.children = this.$refs.sliderGroup.children
				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth
				for (let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					addClass(child, 'slider-item')
					child.style.width = sliderWidth + 'px'
					width += sliderWidth
				}

				if (this.loop && !isResize) {
					width += sliderWidth * 2 //开启snapLoop之后，会在头尾各添加多一个children
					this.$refs.sliderGroup.style.width = width + 'px'
				}
			},
			_initSlider() {
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: true,
					snapLoop: this.loop, //无缝循环开启之后，会在头尾各添加多children
					snapThreshold: 0.3,
					snapSpeed: 400
				})

				this.slider.on('scrollEnd', () => { //派发一个scrollEnd事件，scrollEnd：滚动结束时触发
					let pageIndex = this.slider.currentPage.pageX
					if (this.loop) {
						pageIndex -= 1
					}
					this.currentPageIndex = pageIndex

					if (this.autoPlay) {
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			_initDots() {
				this.dots = new Array(this.children.length)
			},
			activePage(index) {
				let pageIndex = index
				this.currentPageIndex = pageIndex

				if (this.loop) {
					pageIndex += 1
				}

				this.slider.goToPage(pageIndex, 0, 400)
				if (this.autoPlay) {
					clearTimeout(this.timer)
					this._play()
				}
			},
			_play() {
				let pageIndex = this.currentPageIndex + 1
				if (this.loop) {
					pageIndex += 1
				}
				this.timer = setTimeout(() => {
					this.slider.goToPage(pageIndex, 0, 400)
				}, this.interval)
			}
		},
		destroyed() {
			clearTimeout(this.timer)
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.slider
		min-height: 1px
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
			.slider-item
				float: left
				box-sizing: border-box
				overflow: hidden
				text-align: center
				a
					display: block
					width: 100%
					overflow: hidden
					text-decoration: none
				img
					display: block
					width: 100%
		.dots
			position: absolute
			right: 0
			left: 0
			bottom: 12px
			text-align: center
			font-size: 0
			.dot
				display: inline-block
				margin: 0 4px
				width: 8px
				height: 8px
				border-radius: 50%
				background: $color-text-l
				&.active
					width: 20px
					border-radius: 5px
					background: $color-text-ll

</style>

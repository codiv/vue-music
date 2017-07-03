<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<!--
				当按下手指时，触发ontouchstart；
				当移动手指时，触发ontouchmove；
				当移走手指时，触发ontouchend。
			-->
			<div class="progress-btn-wrapper" ref="progressBtn"
				 @touchstart.prevent="progressTouchStart"
				 @touchmove.prevent="progressTouchMove"
				 @touchend="progressTouchEnd"
			>
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {prefixStyle} from 'common/js/dom'

	const progressBtnWidth = 16 //进度条小球的宽度
	const transform = prefixStyle('transform')

	export default {
		props: {
			percent: {
				type: Number,
				default: 0
			}
		},
		created() {
			this.touch = {} //事件间的通讯
		},
		methods: {
			progressTouchStart(e) {
				this.touch.initiated = true //表示已初始化
				this.touch.startX = e.touches[0].pageX //touch（点击）的位置，touches[0]表示第一个手指
				this.touch.left = this.$refs.progress.clientWidth //进度条已经移动的width
			},
			progressTouchMove(e) {
				if (!this.touch.initiated) {
					return
				}
				const deltaX = e.touches[0].pageX - this.touch.startX //手指偏移量
				/*
				 * offsetWidth：
				 * 1.不能小于0，则用Math.max()
				 * 2.不能大于外框（progressBar）的宽度,则用Math.min()
				 * */
				const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
				this._offset(offsetWidth)
			},
			progressTouchEnd() {
				this.touch.initiated = false
				this._triggerPercent() //手指移动结束后，告诉父级改变播放时间
			},
			progressClick(e) {
				/*
				 * getBoundingClientRect():
				 * 返回一个矩形对象，包含四个属性：left、top、right和bottom。
				 * 分别表示元素各边与页面上边和左边的距离。
				 * */
				const rect = this.$refs.progressBar.getBoundingClientRect()
				const offsetWidth = e.pageX - rect.left
				this._offset(offsetWidth)
				this._triggerPercent()
			},
			_offset(offsetWidth) {
				this.$refs.progress.style.width = `${offsetWidth}px` // 改变进度条的width
				this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)` // 改变进度条中的小球位置
			},
			_triggerPercent() {
				const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
				const percent = this.$refs.progress.clientWidth / barWidth
				this.$emit('percentChange', percent) //派发比例给父级
			}
		},
		watch: {
			percent(newPercent) {
				if (newPercent >= 0 && !this.touch.initiated) {
					const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth //外框的宽度
					const offsetWidth = newPercent * barWidth //进度条的偏移量
					this._offset(offsetWidth)
				}
			}
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.progress-bar
		height: 30px
		.bar-inner
			position: relative
			top: 13px
			height: 4px
			background: rgba(0, 0, 0, 0.3)
			.progress
				position: absolute
				height: 100%
				background: $color-theme
			.progress-btn-wrapper
				position: absolute
				left: -8px
				top: -13px
				width: 30px
				height: 30px
				.progress-btn
					position: relative
					top: 7px
					left: 7px
					box-sizing: border-box
					width: 16px
					height: 16px
					border: 3px solid $color-text
					border-radius: 50%
					background: $color-theme

</style>

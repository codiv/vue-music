<!--
使用方法：
1.必须两层：一个外层包裹着一个内层，以div为例
2.外层div：样式设置为position: fixed
3.内层div：必须设置width、height、overflow: hidden
-->
<template>
	<div ref="wrapper">
		<slot></slot>
	</div>

</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'

	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			loadData: {
				type: Array,
				default: null
			},
			listenScroll: { //是否要监听滚动事件
				type: Boolean,
				default: false
			},
			pullup: { //是否上拉加载更多
				type: Boolean,
				default: false
			},
			beforeScroll: { //滚动开始之前
				type: Boolean,
				default: false
			},
			refreshDelay: { //refresh()执行的延迟时间
				type: Number,
				default: 20
			}
		},
		mounted() {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		methods: {
			_initScroll() { //初始化
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})

				if (this.listenScroll) { //是否要监听滚动事件
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}

				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
							this.$emit('srcollToEnd')
						}
					})
				}

				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			/*
			 apply方法：
			 语法：apply([thisObj[,argArray]])
			 定义：应用某一对象的一个方法，用另一个对象替换当前对象。
			 */
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			loadData() { //监测loadData数据是否发生变化
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
			}
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>

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
			refreshDelay: {
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
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
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

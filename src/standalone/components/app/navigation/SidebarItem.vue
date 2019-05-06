<template>
	<q-item
		v-ripple
		:active="active"
		clickable
		:to="href"
		@click="runCallback()"
	>
		<q-item-section avatar>
			<q-icon :class="{ 'rotate-45': rotateIcon }" :name="icon" />
		</q-item-section>
		<q-item-section>
			{{ label }}
		</q-item-section>
	</q-item>
</template>

<script>
	export default {
		props: {
			active: {
				type: Boolean,
				default: false
			},
			to: {
				type: String,
				default: null
			},
			icon: {
				type: String,
				required: true
			},
			rotateIcon: {
				type: Boolean,
				default: false
			},
			label: {
				type: String,
				required: true
			},
			callback: {
				type: Function,
				default: () => ({})
			}
		},
		computed: {
			href()
			{
				if(!this.to) return null;

				const account = this.$store.getters['account/getActiveAccount'] || {};

				return {
					name: this.to,
					params: {
						account: account.name
					}
				};
			}
		},
		methods: {
			runCallback()
			{
				this.callback();
				// chrome.tabs.create({ url: 'index.html' });
			}
		}
	};
</script>

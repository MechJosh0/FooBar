<template>
	<q-item
		v-ripple
		:active="active"
		clickable
		:to="href"
	>
		<q-item-section avatar>
			<q-icon :name="icon" />
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
				required: true
			},
			icon: {
				type: String,
				required: true
			},
			label: {
				type: String,
				required: true
			}
		},
		computed: {
			href()
			{
				const account = this.$store.getters['account/getActiveAccount'] || {};

				return {
					name: this.to,
					params: {
						account: account.name
					}
				};
			}
		}
	};
</script>

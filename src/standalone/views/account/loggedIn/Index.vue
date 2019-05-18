<template>
	<div>
		<b>{{ account.address }}</b>
		<router-view />
	</div>
</template>

<script>
	export default {
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'] || {};
			}
		}
	};
</script>

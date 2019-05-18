<template>
	<div>
		<b>{{ wallet.address }}</b>
		<router-view />
	</div>
</template>

<script>
	export default {
		computed: {
			wallet()
			{
				return this.$store.getters['wallets/getActiveWallet'] || {};
			}
		}
	};
</script>

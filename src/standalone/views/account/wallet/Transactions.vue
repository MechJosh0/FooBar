<template>
	<Transactions :wallet="wallet" />
</template>

<script>
	import Transactions from '@/standalone/components/wallet/transactions/Transactions';

	export default {
		components: {
			Transactions
		},
		computed: {
			wallet()
			{
				return this.$store.getters['wallets/getActiveWallet'];
			}
		}
	};
</script>

<style scoped>
	.extended td {
		border-bottom: none;
	}
</style>

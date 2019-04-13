<template>
	<Transactions :account="account" />
</template>

<script>
	import Transactions from '@/standalone/components/account/transactions/Transactions';

	export default {
		components: {
			Transactions
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		}
	};
</script>

<style scoped>
	.extended td {
		border-bottom: none;
	}
</style>

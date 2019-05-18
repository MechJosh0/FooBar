<template>
	<div class="q-gutter-y-md">
		<q-tabs
			v-if="isLoggedIn"
			v-model="activeWallet"
			shrink
		>
			<q-route-tab
				v-for="a in wallets"
				:key="a.address"
				:name="a.address"
				:label="a.name"
				:to="{
					name: routePath,
					params: {
						wallet: a.name
					}
				}"
			/>
		</q-tabs>
	</div>
</template>

<script>
	export default {
		computed: {
			routePath()
			{
				if(this.$route.name && this.$route.name.startsWith('account.wallet'))
				{
					return this.$route.name;
				}

				return 'account.wallet.user';
			},
			isLoggedIn()
			{
				return this.$store.getters['app/account/isLoggedIn'];
			},
			activeWallet: {
				get()
				{
					const activeWallet = this.$store.getters['wallets/getActiveWallet'] || {};

					return activeWallet.address;
				},
				set()
				{
					// Do nothing
				}
			},
			wallets()
			{
				return this.$store.getters['wallets/getWallets'];
			}
		}
	};
</script>

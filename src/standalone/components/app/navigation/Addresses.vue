<template>
	<q-tabs
		v-if="isLoggedIn"
		v-model="activeAccount"
		shrink
	>
		<q-route-tab
			v-for="a in accounts"
			:key="a.address"
			:name="a.address"
			:label="a.name"
			:to="{
				name: 'account.wallet.user',
				params: {
					account: a.name
				}
			}"
			active
		/>
	</q-tabs>
</template>

<script>
	export default {
		data()
		{
			return {
				activeAccount: null
			};
		},
		computed: {
			isLoggedIn()
			{
				return this.$store.getters['app/account/isLoggedIn'];
			},
			account()
			{
				return this.$store.getters['account/getActiveAccount'] || {};
			},
			accounts()
			{
				return this.$store.getters['account/getAccounts'];
			}
		},
		watch: {
			account(newVal)
			{
				this.activeAccount = this.account.address;
			}
		},
		mounted()
		{
			this.activeAccount = this.account.address;
		}
	};
</script>

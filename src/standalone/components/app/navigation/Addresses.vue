<template>
	<div class="q-gutter-y-md">
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
					name: routePath,
					params: {
						account: a.name
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
			activeAccount: {
				get()
				{
					const activeAccount = this.$store.getters['account/getActiveAccount'] || {};

					return activeAccount.address;
				},
				set()
				{
					// Do nothing
				}
			},
			accounts()
			{
				return this.$store.getters['account/getAccounts'];
			}
		}
	};
</script>

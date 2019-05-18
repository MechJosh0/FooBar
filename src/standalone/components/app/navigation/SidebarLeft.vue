<template>
	<q-list
		padding
		style="height: 100%"
	>
		<Item
			icon="fas fa-home"
			:label="$t('header.navigation.home')"
			to="index"
		/>
		<template v-if="isLoggedIn && account.address">
			<Item
				icon="fas fa-user"
				:label="$t('header.navigation.account')"
				to="account.wallet.user"
			/>
			<Item
				icon="fas fa-receipt"
				:label="$t('header.navigation.transactions')"
				to="account.wallet.transactions"
			/>
			<Item
				icon="fas fa-exchange-alt"
				:label="$t('header.navigation.transfer')"
				to="account.wallet.transfer"
			/>
			<Item
				icon="fas fa-save"
				:label="$t('header.navigation.backup')"
				to="account.wallet.backup"
			/>
			<Item
				icon="fas fa-cloud-download-alt"
				:label="$t('header.navigation.export')"
				to="account.wallet.export"
			/>
			<Item
				icon="fas fa-trash-alt"
				:label="$t('header.navigation.delete')"
				to="account.wallet.delete"
			/>
		</template>
	</q-list>
</template>

<script>
	import Item from '@/standalone/components/app/navigation/SidebarItem';

	export default {
		components: {
			Item
		},
		computed: {
			isLoggedIn()
			{
				return this.$store.getters['app/account/isLoggedIn'];
			},
			account()
			{
				return this.$store.getters['account/getActiveAccount'] || {};
			}
		}
	};
</script>

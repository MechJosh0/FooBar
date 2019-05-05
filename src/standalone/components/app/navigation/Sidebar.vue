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
				icon="fas fa-coins"
				:label="$t('header.navigation.transfer')"
				to="account.wallet.transfer"
			/>
			<Item
				icon="fas fa-file-export"
				:label="$t('header.navigation.backup')"
				to="account.wallet.backup"
			/>
			<Item
				icon="fas fa-print"
				:label="$t('header.navigation.export')"
				to="account.wallet.export"
			/>
		</template>
		<div class="bottom">
			<template v-if="isLoggedIn">
				<Item
					icon="fas fa-upload"
					:label="$t('header.navigation.import')"
					to="account.import"
				/>
				<Item
					icon="fas fa-user-plus"
					:label="$t('header.navigation.newAccount')"
					to="account.create"
				/>
				<Item
					icon="fas fa-cog"
					:label="$t('header.navigation.settings')"
					to="settings"
				/>
				<Item
					icon="fas fa-sign-out-alt"
					:label="$t('header.navigation.logout')"
					to="logout"
				/>
			</template>
			<template v-else>
				<Item
					icon="fas fa-sign-in-alt"
					:label="$t('header.navigation.register')"
					to="register"
				/>
				<Item
					icon="fas fa-sign-in-alt"
					:label="$t('header.navigation.login')"
					to="login"
				/>
			</template>
		</div>
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

<style scoped>
	.bottom {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>

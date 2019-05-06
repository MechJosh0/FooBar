<template>
	<q-list
		padding
		style="height: 100%"
	>
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
				v-if="popup"
				icon="fas fa-arrows-alt-v"
				:label="$t('header.navigation.fullScreen')"
				:callback="openFullScreen"
				rotateIcon
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
			<template v-if="extensionWalletExists !== null">
				<Item
					v-if="popup"
					icon="fas fa-arrows-alt-v"
					:label="$t('header.navigation.fullScreen')"
					:callback="openFullScreen"
					rotateIcon
				/>
				<Item
					v-if="!extensionWalletExists"
					icon="fas fa-sign-in-alt"
					:label="$t('header.navigation.register')"
					to="register"
				/>
				<Item
					v-if="extensionWalletExists"
					icon="fas fa-sign-in-alt"
					:label="$t('header.navigation.login')"
					to="login"
				/>
			</template>
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
			popup()
			{
				return this.$store.getters['app/isAppPopup'];
			},
			isLoggedIn()
			{
				return this.$store.getters['app/account/isLoggedIn'];
			},
			extensionWalletExists()
			{
				return this.$store.getters['app/account/accountExists'];
			}
		},
		methods: {
			openFullScreen()
			{
				chrome.tabs.create({ url: 'index.html' });
			}
		}
	};
</script>

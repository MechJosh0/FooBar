<template>
	<q-layout view="hHh lpR lFf">
		<q-header
			reveal
			bordered
			class="bg-primary text-white"
		>
			<q-toolbar>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="sidebar = !sidebar"
				/>

				<q-toolbar-title>
					<q-btn flat :to="{ name: 'index' }">
						<q-avatar class="on-left">
							<img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg">
						</q-avatar>
						{{ $t('header.title') }}
					</q-btn>
				</q-toolbar-title>
				<q-space />

				<q-tabs v-model="activeAccount" shrink>
					<q-route-tab
						v-for="a in accounts"
						:key="a.address"
						:name="a.address"
						:label="a.name"
						:to="{
							name: 'account',
							params: {
								account: a.name
							}
						}"
						active
					/>
				</q-tabs>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="sidebar"
			side="left"
			bordered
		>
			<q-scroll-area class="fit" :contentStyle="{ height: '100%' }">
				<q-list
					padding
					style="height: 100%"
				>
					<Item
						icon="fas fa-home"
						:label="$t('header.navigation.home')"
						to="index"
					/>
					<template v-if="account.address">
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
					<div class="listBottom">
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
								:label="$t('header.navigation.login')"
								to="login"
							/>
						</template>
					</div>
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container class="container">
			<q-page padding>
				<router-view />
			</q-page>
		</q-page-container>

		<q-footer class="container">
			<q-toolbar>
				<q-toolbar-title>
					<!-- Footer if I need it -->
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
	import appAccount from '@/utils/appAccount';
	import Item from '@/standalone/components/navigation/Item';

	export default {
		components: {
			Item
		},
		data()
		{
			return {
				activeAccount: null,
				sidebar: true
			};
		},
		computed: {
			isLoggedIn()
			{
				return appAccount.isLoggedIn();
			},
			accounts()
			{
				return this.$store.getters['account/getAccounts'];
			},
			account()
			{
				return this.$store.getters['account/getActiveAccount'] || {};
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
		},
		methods: {
			link(name)
			{

			}
		}
	};
</script>

<style scoped>
	.listBottom {
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.container {
		background: #f7f7f7;
	}
</style>

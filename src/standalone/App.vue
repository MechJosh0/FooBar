<template>
	<q-layout view="hHh lpR fFf">
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
					<q-avatar>
						<img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg">
					</q-avatar>
					{{ $t('header.title') }}
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
					v-if="account.address"
					padding
					style="height: 100%"
				>
					<Item
						icon="fas fa-user"
						:label="$t('header.navigation.account')"
						to="account.user"
					/>
					<Item
						icon="fas fa-receipt"
						:label="$t('header.navigation.transactions')"
						to="account.transactions"
					/>
					<div class="listBottom">
						<Item
							icon="fas fa-user-plus"
							:label="$t('header.navigation.newAccount')"
							to="account.create"
						/>
					</div>
				</q-list>
				<q-list v-else padding>
					<q-item
						v-ripple
						active
						clickable
					>
						<q-item-section avatar>
							<q-icon name="inbox" />
						</q-item-section>
						<q-item-section>
							Login
						</q-item-section>
					</q-item>
					<q-item v-ripple clickable>
						<q-item-section avatar>
							<q-icon name="star" />
						</q-item-section>
						<q-item-section>
							Register
						</q-item-section>
					</q-item>
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			<q-page padding>
				<router-view />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
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
</style>

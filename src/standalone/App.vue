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
					@click="sidebarIsOpen = !sidebarIsOpen"
				/>

				<q-toolbar-title>
					<Logo />
				</q-toolbar-title>
				<q-space />

				<Addresses />
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="sidebarIsOpen"
			side="left"
			bordered
		>
			<q-scroll-area class="fit" :contentStyle="{ height: '100%' }">
				<Sidebar />
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
	import Sidebar from '@/standalone/components/app/navigation/Sidebar';
	import Addresses from '@/standalone/components/app/navigation/Addresses';
	import Logo from '@/standalone/components/app/Logo';

	export default {
		components: {
			Sidebar,
			Addresses,
			Logo
		},
		data()
		{
			return {
				sidebarIsOpen: true
			};
		},
		mounted()
		{
			chrome.runtime.sendMessage({ method: 'get', type: 'applicationPassword' }, (res) =>
			{
				this.setApplicationPassword(res);
			});

			chrome.runtime.onMessage.addListener(({ method, type, data }, sender, response) =>
			{
				if(method === 'set' && type === 'applicationPassword')
				{
					this.setApplicationPassword(data);
				}
			});
		},
		methods: {
			setApplicationPassword(password)
			{
				if(!password)
				{
					this.$store.dispatch('app/account/logout');

					return;
				}

				this.$store.dispatch('app/account/login', password);
			}
		}
	};
</script>

<style scoped>
	.container {
		background: #f7f7f7;
	}
</style>

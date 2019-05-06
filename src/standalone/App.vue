<template>
	<div class="body">
		<portal-target name="appOverlay" />
		<q-layout view="lHr lpR fFf">
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
						icon="fas fa-bars"
						@click="sidebarLeftIsOpen = !sidebarLeftIsOpen"
					/>

					<q-toolbar-title>
						<Logo />
					</q-toolbar-title>
					<q-space />

					<Addresses />

					<q-btn
						dense
						flat
						round
						icon="fas fa-user-cog"
						@click="sidebarRightIsOpen = !sidebarRightIsOpen"
					/>
				</q-toolbar>
			</q-header>

			<q-drawer
				v-model="sidebarLeftIsOpen"
				side="left"
				bordered
			>
				<q-scroll-area class="fit" :contentStyle="{ height: '100%' }">
					<SidebarLeft />
				</q-scroll-area>
			</q-drawer>

			<q-drawer
				v-model="sidebarRightIsOpen"
				side="right"
				bordered
			>
				<q-scroll-area class="fit" :contentStyle="{ height: '100%' }">
					<SidebarRight />
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
	</div>
</template>

<script>
	import SidebarLeft from '@/standalone/components/app/navigation/SidebarLeft';
	import SidebarRight from '@/standalone/components/app/navigation/SidebarRight';
	import Addresses from '@/standalone/components/app/navigation/Addresses';
	import Logo from '@/standalone/components/app/Logo';

	export default {
		components: {
			SidebarLeft,
			SidebarRight,
			Addresses,
			Logo
		},
		data()
		{
			return {
				sidebarLeftIsOpen: true,
				sidebarRightIsOpen: false
			};
		}
	};
</script>

<style scoped>
	.body {
		min-width: 500px;
	}

	.container {
		background: #f7f7f7;
	}
</style>

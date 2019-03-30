<template>
	<div>
		<v-toolbar app>
			<v-toolbar-title class="headline text-uppercase">
				<span>Vuetify</span>
				<span class="font-weight-light">MATERIAL DESIGN</span>
			</v-toolbar-title>
			<v-spacer />
			<v-btn
				flat
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				target="_blank"
			>
				<span class="mr-2">Latest Release</span>
			</v-btn>
		</v-toolbar>

		<v-content>
			<p>standalone {{ defaultText }}</p>
			<v-btn color="success" @click="createAccount()">
				Success
			</v-btn>
			<v-btn color="error">
				Error
			</v-btn>
			<v-btn color="warning">
				Warning
			</v-btn>
			<v-btn color="info">
				Info
			</v-btn>
		</v-content>
		<div v-if="account">
			{{ account }}
		</div>
	</div>
</template>

<script>
	import { Account } from 'nuls-js';

	export default {
		data()
		{
			return {
				account: null
			};
		},
		computed: {
			defaultText()
			{
				return chrome.i18n.getMessage('extName');
			}
		},
		mounted()
		{
			chrome.runtime.sendMessage({});
		},
		methods: {
			createAccount()
			{
				const account = new Account();

				this.account = account.create();
			}
		}
	};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>

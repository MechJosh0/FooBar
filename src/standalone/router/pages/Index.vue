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
			<p>standalone</p>
			<p>
				{{ $t('message.hello') }}
				{{ $t('message.goodbye') }}
			</p>
			<v-btn color="success" @click="createAccount()">
				Create Account
			</v-btn>
			<v-btn color="error" @click="deleteAccount()">
				Delete Account
			</v-btn>
			<v-btn color="warning" @click="changeLocale('en')">
				Translate English
			</v-btn>
			<v-btn color="info" @click="changeLocale('fr')">
				Translate French
			</v-btn>
		</v-content>
		<div v-if="account">
			{{ account }}
		</div>
	</div>
</template>

<script>
	import { Account } from 'nuls-js';
	import { setI18nLanguage } from '../../../i18n';

	export default {
		data()
		{
			return {
				account: null
			};
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
			},
			deleteAccount()
			{
				this.account = null;
			},
			changeLocale(locale)
			{
				setI18nLanguage(locale);
			}
		}
	};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>

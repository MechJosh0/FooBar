<template>
	<!-- <div>
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

		<Login />

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
			<div v-if="account">
				<p>{{ account }}</p>
			</div>
		</v-content>
	</div> -->
	<div>
		User page
	</div>
</template>

<script>
	import Login from '../Login';

	export default {
		components: {
			Login
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getAccount'];
			}
		},
		mounted()
		{
			chrome.runtime.sendMessage({});
		},
		methods: {
			createAccount()
			{
				this.$store.dispatch('account/createNewAccount');
			},
			deleteAccount()
			{
				this.$store.dispatch('account/logOut');
			},
			changeLocale(locale)
			{
				this.$store.dispatch('i18n/setLocale', locale);
			}
		}
	};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>

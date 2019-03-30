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
			<v-btn color="success">
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
	</div>
</template>

<script>

	export default {
		data()
		{
			return {};
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
		}
	};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>

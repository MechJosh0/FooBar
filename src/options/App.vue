<template>
	<!-- <v-app>
		<p>options {{ defaultText }}</p>
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
	</v-app> -->
	<div>
		<p>options {{ defaultText }}</p>
	</div>
</template>

<script>
	export default {
		name: 'App',
		computed: {
			defaultText()
			{
				return chrome.i18n.getMessage('extName');
			}
		}
	};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>

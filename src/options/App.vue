<template>
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

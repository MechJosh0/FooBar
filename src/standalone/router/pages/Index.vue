<template>
	<p>standalone {{ defaultText }}</p>
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

<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
	import { setI18nLanguage } from '../i18n';

	export default {
		mounted()
		{
			if(localStorage.getItem('locale') !== this.$i18n.locale)
			{
				setI18nLanguage(localStorage.getItem('locale'));
			}
			else if(chrome.i18n.getUILanguage() !== this.$i18n.locale)
			{
				setI18nLanguage(chrome.i18n.getUILanguage());
			}
			else if(process.env.VUE_APP_I18N_LOCALE !== this.$i18n.locale)
			{
				setI18nLanguage(process.env.VUE_APP_I18N_LOCALE);
			}
		}
	};
</script>

<style>
html {
    width: 400px;
    height: 400px;
}
</style>

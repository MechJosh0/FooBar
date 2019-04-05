import Vue from 'vue';
import VueI18n from 'vue-i18n';
import defaultMessages from '../locales/en';

Vue.use(VueI18n);

const availableLocales = ['en', 'fr'];
const locale = 'en';

const i18n = new VueI18n({
	locale,
	fallbackLocale: locale,
	messages: { [locale]: defaultMessages }
});

const loadedLanguages = [locale];

const loadLanguageAsync = async (locale) =>
{
	if(!availableLocales.includes(locale)) return;

	if(!locale || i18n.locale === locale) return;

	if(loadedLanguages.includes(locale)) return;

	const messages = await import(/* webpackChunkName: "locale-[request]" */ `../locales/${locale}`);

	i18n.setLocaleMessage(locale, messages.default);
	loadedLanguages.push(locale);
};

export const setI18nLanguage = async (locale) =>
{
	if(!availableLocales.includes(locale)) return;

	await loadLanguageAsync(locale);

	i18n.locale = locale;
};

export default i18n;

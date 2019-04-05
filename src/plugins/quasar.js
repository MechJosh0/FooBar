import Vue from 'vue';
import '@/styles/quasar.styl';
import 'quasar/dist/quasar.ie.polyfills';
import {
	Quasar,
	Ripple,
	QBtn
} from 'quasar';

Vue.use(Quasar, {
	config: {},
	components: {
		QBtn
	},
	directives: {
		Ripple
	}
});

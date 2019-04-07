import Vue from 'vue';
import '@/styles/quasar.styl';
import 'quasar/dist/quasar.ie.polyfills';
import iconSet from 'quasar/icon-set/fontawesome-v5.js';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import {
	Quasar,
	Ripple,
	QBtn,
	QLayout,
	QHeader,
	QToolbar,
	QToolbarTitle,
	QAvatar,
	QDrawer,
	QPageContainer,
	QPage,
	QItemSection,
	QItem,
	QIcon,
	QList,
	QScrollArea,
	QForm,
	QTabs,
	QTab,
	QRouteTab,
	QSpace,
	QToggle,
	QInput,
	Notify,
	QCard,
	QCardSection,
	QTable,
	QFooter,
	QItemLabel,
	QRadio,
	QField,
	QSelect
} from 'quasar';

Vue.use(Quasar, {
	iconSet,
	components: {
		QBtn,
		QLayout,
		QHeader,
		QToolbar,
		QToolbarTitle,
		QAvatar,
		QDrawer,
		QPageContainer,
		QPage,
		QItemSection,
		QItem,
		QIcon,
		QList,
		QScrollArea,
		QForm,
		QTabs,
		QTab,
		QRouteTab,
		QSpace,
		QToggle,
		QInput,
		QCard,
		QCardSection,
		QTable,
		QFooter,
		QItemLabel,
		QRadio,
		QField,
		QSelect
	},
	directives: {
		Ripple
	},
	plugins: {
		Notify
	}
});

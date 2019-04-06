import Vue from 'vue';
import '@/styles/quasar.styl';
import 'quasar/dist/quasar.ie.polyfills';
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
	Notify
} from 'quasar';

Vue.use(Quasar, {
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
		QInput
	},
	directives: {
		Ripple
	},
	plugins: {
		Notify
	}
});

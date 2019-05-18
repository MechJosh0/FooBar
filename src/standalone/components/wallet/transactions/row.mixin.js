import Duration from 'luxon/src/duration';
import DateTime from 'luxon/src/datetime';
import { date } from 'quasar';
import transactionMixin from '@/standalone/components/wallet/transactions/transaction.mixin';

export default {
	mixins: [transactionMixin],
	props: {
		payload: {
			type: Object,
			required: true
		}
	},
	data()
	{
		return {
			currentTime: new Date().getTime(),
			intervalinterval: null
		};
	},
	mounted()
	{
		this.interval = setInterval(() =>
		{
			this.currentTime = new Date().getTime();
		}, 1000);
	},
	beforeDestroy()
	{
		clearInterval(this.interval);
	},
	computed: {
		expand()
		{
			return this.payload.expand;
		},
		cols()
		{
			return this.payload.cols;
		},
		row()
		{
			return this.payload.row;
		},
		change()
		{
			return this.translateNULS(this.row.value);
		},
		balance()
		{
			return this.translateNULS(this.row.value);
		},
		fee()
		{
			return this.translateNULS(this.row.fee);
		},
		sent()
		{
			if(this.row.display_type === 'IN') return null;

			return this.translateNULS(this.row.value + this.row.fee).substr(1);
		},
		type()
		{
			return this.translateTransactionType(this.row);
		},
		blockHeight()
		{
			if(!this.row.blockHeight)
			{
				return null;
			}

			return this.row.blockHeight.toLocaleString();
		},
		address()
		{
			const { truncated, address } = this.translateRelatedAddress(this.row);

			if(this.$q.screen.width < 399)
			{
				return truncated;
			}

			if(this.$q.screen.lt.sm)
			{
				return address;
			}

			if(this.$q.screen.lt.md)
			{
				return truncated;
			}

			if(this.$q.screen.width < 899)
			{
				return truncated;
			}

			return address;
		},
		date()
		{
			const today = DateTime.local().startOf('day').toMillis();
			const yesterday = DateTime.local().minus({ days: 1 }).startOf('day').toMillis();
			const duration = Duration.fromMillis(this.currentTime - this.row.time).shiftTo('hours', 'minutes', 'seconds').toObject();

			if(this.row.time - today > 0)
			{
				if(duration.hours !== 0)
				{
					return this.$tc('dates.duration.hoursAgo', duration.hours, { hours: duration.hours });
				}

				if(duration.minutes !== 0)
				{
					return this.$tc('dates.duration.minutesAgo', duration.minutes, { minutes: duration.minutes });
				}

				if(duration.seconds !== 0)
				{
					return this.$tc('dates.duration.secondsAgo', duration.seconds, { seconds: Math.floor(duration.seconds) });
				}
			}

			if(this.row.time - yesterday > 0)
			{
				return this.$t('dates.duration.yesterday');
			}

			return date.formatDate(this.row.time, 'DD MMM YYYY');
		}
	}
};

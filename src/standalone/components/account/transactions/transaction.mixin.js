
import { date } from 'quasar';

export default {
	methods: {
		translateTransactionType(type, displayType)
		{
			if(type === 2)
			{
				return this.$t(`views.transactions.table.columns.type.types.2-${displayType === 'OUT' ? 'sent' : 'received'}`);
			}

			if(this.$te(`views.transactions.table.columns.type.types.${type}`))
			{
				return this.$t(`views.transactions.table.columns.type.types.${type}`);
			}

			console.error('Unknown transaction type:', type);

			return this.$t('views.transactions.table.columns.type.types.unknown', { type });
		},
		translateNULS(val)
		{
			return `${(val / 100000000).toLocaleString()} NULS`;
		},
		translateDateFormat(timestamp)
		{
			return date.formatDate(timestamp, 'DD MMM YYYY');
		},
		translateRelatedAddress({ target, source, displayType })
		{
			const address = displayType === 'OUT' ? target : source;
			const truncated = this.truncateString(address);

			return { truncated, address };
		},
		truncateString(str)
		{
			return `${str.substr(0, 4)}...${str.substr(str.length - 4, 4)}`;
		}
	}
};

export default {
	methods: {
		translateTransactionType({ type, display_type: displayType, attempt })
		{
			if(type === 2)
			{
				return this.$t(`views.transactions.table.columns.type.types.2-${displayType === 'OUT' ? 'sent' : 'received'}`);
			}

			if(type === '2-verifying')
			{
				return this.$t(`views.transactions.table.columns.type.types.2-verifying`, { num: attempt });
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
		translateRelatedAddress({ target, source, display_type: displayType })
		{
			const address = displayType === 'OUT' ? target || source : source || target;
			const truncated = this.truncateString(address);

			return { truncated, address };
		},
		truncateString(str)
		{
			return `${str.substr(0, 4)}...${str.substr(str.length - 4, 4)}`;
		}
	}
};


import transactionMixin from '@/standalone/components/account/transactions/transaction.mixin';

export default {
	mixins: [transactionMixin],
	props: {
		payload: {
			type: Object,
			required: true
		}
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
			return this.translateTransactionType(this.row.type, this.row.display_type);
		},
		blockHeight()
		{
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
			return this.translateDateFormat(this.row.time);
		}
	}
};

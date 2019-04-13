<template>
	<q-tr v-show="expand">
		<q-td colspan="100%">
			<ExpandPanelItem :payload="payload" />
		</q-td>
	</q-tr>
</template>

<script>
	import rowMixin from '@/standalone/components/account/transactions/row.mixin';
	import ExpandPanelItem from '@/standalone/components/account/transactions/ExpandPanelItem';

	export default {
		components: {
			ExpandPanelItem
		},
		mixins: [rowMixin],
		computed: {
			items()
			{
				return [
					{
						label: 'views.transactions.table.panel.txHash',
						value: this.row.hash
					},
					{
						label: 'views.transactions.table.panel.blockHeight',
						value: this.row.blockHeight
					},
					{
						label: 'views.transactions.table.panel.sent',
						value: this.sent
					},
					{
						label: 'views.transactions.table.panel.fee',
						value: this.fee
					},
					{
						label: 'views.transactions.table.panel.remark',
						value: this.row.remark
					}
				].filter(({ value }) => value);
			}
		}
	};
</script>

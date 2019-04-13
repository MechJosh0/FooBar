<template>
	<!-- <q-list dense>
		<q-item v-for="({ label, value }, i) in items" :key="i">
			<q-item-section>
				<q-item-label class="text-left">
					{{ $t(label) }}
				</q-item-label>
			</q-item-section>
			<q-item-section>
				<q-item-label class="text-left" caption>
					{{ value }}
				</q-item-label>
			</q-item-section>
		</q-item>
	</q-list> -->
	<q-markup-table flat :borded="false">
		<tbody>
			<tr v-for="({ label, value }, i) in items" :key="i">
				<td class="text-left">
					{{ $t(label) }}
				</td>
				<td class="text-right">
					{{ value }}
				</td>
			</tr>
		</tbody>
	</q-markup-table>
</template>

<script>
	import rowMixin from '@/standalone/components/account/transactions/row.mixin';

	export default {
		mixins: [rowMixin],
		computed: {
			items()
			{
				return [
					{
						label: 'views.transactions.table.panel.txHash',
						value: this.$q.screen.lt.sm ? this.truncateString(this.row.hash) : this.row.hash
					},
					{
						label: 'views.transactions.table.panel.blockHeight',
						value: this.blockHeight
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

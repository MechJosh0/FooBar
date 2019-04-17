<template>
	<div class="q-pa-md">
		<div v-for="({ transaction }, hash) in confirmingTransactions" :key="hash">
			<div>hash: {{ hash }}</div>
			<div>{{ transaction }}</div>
		</div>
		<q-table
			:title="$t('views.transactions.table.label')"
			:rowsPerPageLabel="$t('views.transactions.table.recordsPerPage')"
			:data="transactions"
			:columns="columns"
			:pagination.sync="pagination"
			:filter="filter"
			:grid="$q.screen.lt.sm"
			:hideHeader="$q.screen.lt.sm"
			:loading="loading"
			rowKey="blockHeight"
		>
			<template v-slot:top>
				<q-space />
				<q-input
					v-model="filter"
					borderless
					dense
					filled
					debounce="300"
					color="primary"
				>
					<template v-slot:append>
						<q-icon name="fas fa-search" />
					</template>
				</q-input>
			</template>
			<template v-if="$q.screen.lt.sm" v-slot:body="props">
				<Mobile :payload="props" @click.native="props.expand = !props.expand">
					<ExpandPanel :payload="props" />
				</Mobile>
			</template>
			<template v-else v-slot:body="props">
				<Desktop :payload="props" @click.native="props.expand = !props.expand" />
				<DesktopExpandPanel :payload="props" />
			</template>
		</q-table>
	</div>
</template>

<script>
	import transactionMixin from '@/standalone/components/account/transactions/transaction.mixin';

	export default {
		components: {
			Desktop: () => import('@/standalone/components/account/transactions/desktop/Item'),
			DesktopExpandPanel: () => import('@/standalone/components/account/transactions/desktop/ExpandPanel'),
			Mobile: () => import('@/standalone/components/account/transactions/mobile/Item')
		},
		mixins: [transactionMixin],
		props: {
			account: {
				type: Object,
				required: true
			}
		},
		data()
		{
			return {
				loading: true,
				filter: '',
				res: [],
				pagination: {
					sortBy: 'date',
					descending: false,
					page: 1,
					rowsPerPage: 20
					// rowsNumber: xx if getting data from a server
				}
			};
		},
		computed: {
			columns()
			{
				const columns = [];

				columns.push({
					name: 'date',
					label: this.$t('views.transactions.table.columns.date'),
					field: (row) => row.time,
					align: 'left',
					sortable: true,
					sort: (a, b, rowA, rowB) => parseInt(a, 10) + parseInt(b, 10)
				});

				if(!this.$q.screen.lt.lg)
				{
					columns.push({
						name: 'inOut',
						label: this.$t('views.transactions.table.columns.inOut'),
						field: (row) => row.display_type,
						align: 'left',
						sortable: true
					});
				}

				columns.push({
					name: 'address',
					label: this.$t('views.transactions.table.columns.address'),
					align: 'left',
					field: (row) => (row.display_type === 'OUT' ? row.target : row.source)
				});

				if(!this.$q.screen.lt.lg)
				{
					columns.push({
						name: 'remark',
						label: this.$t('views.transactions.table.columns.remark'),
						align: 'left',
						field: (row) => row.remark
					});
				}

				columns.push({
					name: 'type',
					label: this.$t('views.transactions.table.columns.type.label'),
					align: 'right',
					field: (row) => this.translateTransactionType(row.type, row.displayType),
					sortable: true,
					sort: (a, b, rowA, rowB) =>
					{
						let rowAValue = rowA.type,
							rowBValue = rowB.type;

						if(rowAValue === 2)
						{
							rowAValue = rowA.display_type === 'IN' ? 2.0 : 2.1;
						}

						if(rowBValue === 2)
						{
							rowBValue = rowB.display_type === 'IN' ? 2.0 : 2.1;
						}

						return rowAValue - rowBValue;
					}
				});

				columns.push({
					name: 'change',
					label: this.$t('views.transactions.table.columns.change'),
					align: 'right',
					field: (row) => row.value,
					sortable: true,
					sort: (a, b, rowA, rowB) => parseInt(b, 10) - parseInt(a, 10)
				});

				columns.push({
					name: 'balance',
					label: this.$t('views.transactions.table.columns.balance'),
					align: 'right',
					field: (row) => row.value,
					sortable: true,
					sort: (a, b, rowA, rowB) => parseInt(b, 10) - parseInt(a, 10)
				});

				return columns;
			},
			confirmingTransactions()
			{
				return this.$store.getters['transactions/write/getConfirming'];
			},
			transactions()
			{
				return this.res;
			}
		},
		mounted()
		{
			this.getTransactions();
		},
		methods: {
			async getTransactions()
			{
				this.res = await this.$store.dispatch('transactions/read/getAddressTransactions', this.account.address);

				this.loading = false;
			}
		}
	};
</script>

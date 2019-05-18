<template>
	<div class="q-pa-md">
		<q-table
			:title="$t('views.index.table.label')"
			:data="wallets"
			:columns="columns"
			rowKey="address"
		/>
	</div>
</template>

<script>
	export default {
		data()
		{
			return {
				columns: [
					{
						name: 'name',
						label: this.$t('views.index.table.columns.name'),
						required: true,
						align: 'left',
						field: (row) => row.name,
						format: (val) => `${val}`,
						sortable: true
					},
					{
						name: 'address',
						label: this.$t('views.index.table.columns.address'),
						required: true,
						align: 'left',
						field: (row) => row.address,
						format: (val) => `${val}`,
						sortable: true
					}
				]
			};
		},
		computed: {
			isLoggedIn()
			{
				return this.$store.getters['app/account/isLoggedIn'];
			},
			appPassword()
			{
				return this.$store.getters['app/account/password'];
			},
			wallets()
			{
				const wallets = this.$store.getters['wallets/getWallets'];

				return Object.keys(wallets).map((address) =>
				{
					return {
						address,
						name: wallets[address].name
					};
				});
			}
		}
	};
</script>

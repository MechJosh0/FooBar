<template>
	<div class="q-pa-xs grid-style-transition">
		<q-card>
			<q-list dense>
				<q-item v-for="col in cols.filter(col => col.name !== 'desc')" :key="col.name">
					<q-item-section>
						<q-item-label>{{ col.label }}</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-item-label caption>
							<span v-if="col.name === 'date'">
								{{ date }}
							</span>
							<span v-else-if="col.name === 'address'">
								{{ address }}
							</span>
							<span v-else-if="col.name === 'type'">
								{{ type }}
							</span>
							<span v-else-if="col.name === 'change'">
								<q-badge
									v-if="row.value < 0"
									square
									color="negative"
								>
									{{ change }}
								</q-badge>
								<q-badge
									v-else
									square
									color="positive"
								>
									+{{ change }}
								</q-badge>
							</span>
							<span v-else>
								{{ row.value }}</span>
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
			<ExpandPanelItem :payload="payload" />
		</q-card>
	</div>
</template>

<script>
	import rowMixin from '@/standalone/components/account/transactions/row.mixin';
	import ExpandPanelItem from '@/standalone/components/account/transactions/ExpandPanelItem';

	export default {
		components: {
			ExpandPanelItem
		},
		mixins: [rowMixin]
	};
</script>

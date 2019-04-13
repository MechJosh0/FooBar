<template>
	<q-tr
		class="cursor-pointer"
		:class="{ extended: expand }"
	>
		<q-td key="date">
			{{ date }}
		</q-td>
		<q-td
			v-if="!$q.screen.lt.lg"
			key="inOut"
		>
			<q-icon
				v-if="row.display_type === 'OUT'"
				class="rotate-315 text-negative"
				name="fas fa-arrow-right"
			/>
			<q-icon
				v-else
				class="rotate-135 text-positive"
				name="fas fa-arrow-right"
			/>
		</q-td>
		<q-td key="address">
			{{ address }}
		</q-td>
		<q-td v-if="!$q.screen.lt.lg" key="remark">
			{{ row.remark }}
		</q-td>
		<q-td key="type" class="text-right">
			{{ type }}
		</q-td>
		<q-td key="change" class="text-right">
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
		</q-td>
		<q-td key="balance" class="text-right">
			{{ balance }}
		</q-td>
	</q-tr>
</template>

<script>
	import rowMixin from '@/standalone/components/account/transactions/row.mixin';

	export default {
		mixins: [rowMixin]
	};
</script>

<style scoped>
	.extended td {
		border-bottom: none;
	}
</style>

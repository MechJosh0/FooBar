<template>
	<div v-if="!running">
		<h4>{{ $t('views.export.title') }}</h4>
		<p>{{ $t('views.export.information') }}</p>
		<div v-if="pages">
			<p>
				{{ $t('views.export.accountInformation', {
					totalTransactions: info.totalTransactionsFormatted,
					expectedTime: info.expectedTimeFormatted
				}) }}
			</p>
			<q-btn
				color="primary"
				icon="fas fa-cloud-download-alt"
				:label="$t('views.export.beginDownload')"
				@click="startExport"
			/>
		</div>
		<q-spinner
			v-else
			color="primary"
		/>
	</div>
	<div v-else>
		<portal to="appOverlay">
			<q-inner-loading :showing="true" class="loadingPortal">
				<q-spinner-gears size="150px" color="primary" />
				<p>
					Running...
				</p>
			</q-inner-loading>
		</portal>
	</div>
</template>

<script>
	import Duration from 'luxon/src/duration';

	export default {
		data()
		{
			return {
				running: false,
				callSleeper: 2500, // milliseconds
				pages: null
			};
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		},
		mounted()
		{
			this.getInitData();
		},
		methods: {
			startExport()
			{
				this.running = true;
			},
			endExport()
			{
				this.$q.loading.hide();
			},
			async getInitData()
			{
				const res = await this.getFullTransactions(1);

				this.pages = {
					active: 0,
					total: res.pagination_total,
					perPage: res.pagination_per_page
				};

				this.info = {};
				this.info.totalTransactions = this.pages.total * this.pages.perPage;
				this.info.totalTransactionsFormatted = this.makeNumberPretty(this.info.totalTransactions);
				this.info.expectedTime = this.info.totalTransactions * (this.callSleeper / 1000);

				const duration = Duration.fromMillis(this.info.expectedTime).shiftTo('hours', 'minutes', 'seconds').toObject();
				let hours,
					minutes;

				if(duration.hours !== 0)
				{
					hours = this.$tc('dates.duration.hours', duration.hours, { hours: duration.hours });
				}

				if(duration.minutes !== 0)
				{
					minutes = this.$tc('dates.duration.minutes', duration.minutes, { minutes: duration.minutes });
				}

				if(hours && minutes)
				{
					this.info.expectedTimeFormatted = this.$t('dates.duration.timeAndTime', { xTime: hours, yTime: minutes });
				}
				else
				{
					this.info.expectedTimeFormatted = minutes;
				}
			},
			async getFullTransactions(page)
			{
				const res = await this.$store.dispatch('transactions/read/getAddressFullTransactions', { address: this.account.address, page });

				return res;
			},
			makeNumberPretty(num)
			{
				let prepend = num.toString().substring(0, 2),
					append;

				prepend = `${prepend.slice(0, 1)}.${prepend.slice(1)}`;

				if(num > 1000000000) // X billion
				{
					append = 'billion';
				}
				else if(num > 1000000) // X million
				{
					append = 'million';
				}
				else if(num > 1000) // X thousand
				{
					append = 'thousand';
				}

				if(append)
				{
					return `${prepend}${this.$t(`views.export.numberFormat.${append}`)}`;
				}

				return num;
			}
		}
	};
</script>

<style>
	.loadingPortal {
		z-index: 9999;
		background: rgba(0, 0, 0, 0.5);
	}
</style>

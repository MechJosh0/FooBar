<template>
	<div v-if="!processingExport && !downloadReady">
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
				icon="fas fa-cogs"
				:label="$t('views.export.beginDownload')"
				@click="startExport"
			/>
		</div>
		<q-spinner
			v-else
			color="primary"
		/>
	</div>
	<div v-else-if="downloadReady">
		<h4>{{ $t('views.export.download.title') }}</h4>
		<p>{{ $t('views.export.download.information') }}</p>
		<q-btn
			color="primary"
			icon="fas fa-cloud-download-alt"
			:label="$t('views.export.download.button')"
			@click="download"
		/>
	</div>
	<div v-else>
		<portal to="appOverlay">
			<q-inner-loading :showing="true" class="loadingPortal">
				<div>
					<q-spinner-gears size="150px" color="primary" />
					<h4 class="text-center">
						{{ $t('views.export.exportingProgress', { num: 2 }) }}
					</h4>
					<q-tooltip contentClass="tooltipPortal">
						{{ $t('views.export.exportingProgressTooltip', {
							pageX: pages.active.toLocaleString(),
							pageY: pages.total.toLocaleString()
						}) }}
					</q-tooltip>
				</div>
			</q-inner-loading>
		</portal>
	</div>
</template>

<script>
	import Duration from 'luxon/src/duration';
	import createCSVFile from '@/utils/createCSVFile';
	import { sleep } from '@/utils/helpers';

	export default {
		data()
		{
			return {
				downloadReady: false,
				processingExport: false,
				callSleeper: 1000, // milliseconds
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
			async startExport()
			{
				this.processingExport = true;

				const transactions = [];
				const header = [
					'Block Height',
					'Datetime (UTC)',
					'Hash',
					'Address',
					'Amount Received',
					'Amount Sent',
					'Remark'
				];

				for(this.pages.active = 1; this.pages.active <= this.pages.total; this.pages.active += 1)
				{
					console.log('Page', this.pages.active);

					const res = await this.getFullTransactions(this.pages.active); // eslint-disable-line no-await-in-loop

					res.transactions.forEach((transaction) =>
					{
						transactions.push([
							transaction.blockHeight,
							transaction.time,
							transaction.hash,
							'abc',
							transaction.value,
							transaction.value,
							transaction.remark
						]);
					});

					await sleep(this.callSleeper); // eslint-disable-line no-await-in-loop
				}

				this.fileData = [header, ...transactions];
				this.downloadReady = true;
				this.processingExport = false;
				this.download();
			},
			endExport()
			{
				this.$q.loading.hide();
			},
			download()
			{
				createCSVFile(`${this.account.address}.csv`, this.fileData);
			},
			async getInitData()
			{
				const res = await this.getFullTransactions(1);

				this.pages = {
					active: 0,
					total: Math.ceil(res.pagination_total / res.pagination_per_page),
					perPage: res.pagination_per_page
				};

				this.info = {};
				this.info.totalTransactions = res.pagination_total;
				this.info.totalTransactionsFormatted = this.makeNumberPretty(this.info.totalTransactions);
				this.info.expectedTime = this.pages.total * this.callSleeper;

				const duration = Duration.fromMillis(this.info.expectedTime).shiftTo('hours', 'minutes', 'seconds').toObject();
				let hours,
					minutes;

				if(duration.hours !== 0)
				{
					hours = this.$tc('dates.duration.hours', duration.hours, { hours: duration.hours + 1 });
				}

				if(duration.minutes !== 0)
				{
					minutes = this.$tc('dates.duration.minutes', duration.minutes, { minutes: duration.minutes + 1 });
				}

				if(hours && minutes)
				{
					this.info.expectedTimeFormatted = this.$t('dates.duration.timeAndTime', { xTime: hours, yTime: minutes });
				}
				else if(minutes)
				{
					this.info.expectedTimeFormatted = minutes;
				}
				else
				{
					this.info.expectedTimeFormatted = this.$t('dates.duration.lessThanAMinute');
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

	.tooltipPortal {
		z-index: 10000;
		background: purple;
		font-size: 12px;
	}
</style>

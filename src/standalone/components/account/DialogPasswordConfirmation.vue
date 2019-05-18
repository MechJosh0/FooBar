<template>
	<q-dialog v-model="open" :persistent="persistent">
		<q-card style="min-width: 400px">
			<q-form
				@submit="onSubmit"
				@reset="onReset"
			>
				<q-card-section>
					<div class="text-h6">
						{{ $t('dialog.passwordConfirmation.title') }}
					</div>

					<div class="text-subtitle2">
						<slot name="information" />
					</div>
				</q-card-section>

				<q-card-section>
					<q-input
						v-model="password"
						type="password"
						:label="$t('dialog.passwordConfirmation.input')"
						dense
						autofocus
						lazyRules
						:rules="validation.password"
					/>
				</q-card-section>

				<q-card-actions align="right" class="text-primary">
					<q-btn
						v-close-popup
						flat
						:label="$t('dialog.passwordConfirmation.cancel')"
					/>
					<q-btn
						type="submit"
						color="secondary"
					>
						<span v-if="$slots.submitLabel">
							<slot name="submitLabel" />
						</span>
						<span v-else>
							{{ $t('dialog.passwordConfirmation.submit') }}
						</span>
					</q-btn>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script>
	export default {
		props: {
			dialogIsOpen: {
				type: Boolean,
				default: false
			},
			persistent: {
				type: Boolean,
				default: true
			}
		},
		data()
		{
			return {
				open: this.dialogIsOpen,
				validation: {
					password: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('dialog.passwordConfirmation.form.fields.password.errors.required');
						},
						(val) => // Validate
						{
							if(this.$store.getters['app/account/isValidPassword'](val)) return true;

							return this.$t('dialog.passwordConfirmation.form.fields.password.errors.incorrect');
						}
					]
				},
				passwordDialogIsOpen: false,
				password: ''
			};
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		},
		watch: {
			dialogIsOpen(newVal)
			{
				this.open = newVal;
			},
			open(newVal)
			{
				this.password = '';

				if(this.open !== this.dialogIsOpen)
				{
					this.closeDialog();
				}
			}
		},
		methods: {
			closeDialog()
			{
				this.$emit('closed', this.open);
			},
			onReset()
			{
				this.password = '';
			},
			onSubmit()
			{
				if(this.$store.getters['app/account/isValidPassword'](this.password))
				{
					this.$emit('input', true);
					this.closeDialog();
				}
			}
		}
	};
</script>

<template>
  <div id="staff-payment-container" :class="{'invalid-section': invalidStaffPayment}">
    <StaffPaymentShared
      :staffPaymentData="getStaffPaymentStep.staffPayment"
      :displayPriorityCheckbox="displayPriorityCheckbox"
      :validate="getValidateSteps"
      :invalidSection="invalidStaffPayment"
      @update:staffPaymentData="onStaffPaymentDataUpdate($event)"
      @valid="setStaffPaymentValidity($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { StaffPayment as StaffPaymentShared } from '@bcrs-shared-components/staff-payment'
import { ActionBindingIF, StaffPaymentIF, StaffPaymentStepIF } from '@/interfaces'
import { StaffPaymentOptions } from '@/enums'

/** This is a shim between the view and the atomic component. */
@Component({
  components: { StaffPaymentShared }
})
export default class StaffPayment extends Vue {
  /** Whether to display priority checkbox. */
  @Prop({ default: true })
  readonly displayPriorityCheckbox: boolean

  // Global getters
  @Getter getStaffPaymentStep!: StaffPaymentStepIF
  @Getter getValidateSteps!: boolean

  // Global actions
  @Action setStaffPayment!: ActionBindingIF
  @Action setStaffPaymentValidity!: ActionBindingIF

  /** Check validity state, only when prompted by app. */
  get invalidStaffPayment (): boolean {
    return this.getValidateSteps && !this.getStaffPaymentStep.valid
  }

  onStaffPaymentDataUpdate (event: any) {
    let staffPaymentData: StaffPaymentIF = { ...this.getStaffPaymentStep.staffPayment, ...event }

    switch (staffPaymentData.option) {
      case StaffPaymentOptions.FAS:
        staffPaymentData = {
          option: StaffPaymentOptions.FAS,
          routingSlipNumber: staffPaymentData.routingSlipNumber,
          isPriority: staffPaymentData.isPriority,
          bcolAccountNumber: '',
          datNumber: '',
          folioNumber: ''
        }
        break

      case StaffPaymentOptions.BCOL:
        staffPaymentData = {
          option: StaffPaymentOptions.BCOL,
          bcolAccountNumber: staffPaymentData.bcolAccountNumber,
          datNumber: staffPaymentData.datNumber,
          folioNumber: staffPaymentData.folioNumber,
          isPriority: staffPaymentData.isPriority,
          routingSlipNumber: ''
        }
        break

      case StaffPaymentOptions.NO_FEE:
        staffPaymentData = {
          option: StaffPaymentOptions.NO_FEE,
          routingSlipNumber: '',
          isPriority: false,
          bcolAccountNumber: '',
          datNumber: '',
          folioNumber: ''
        }
        break

      case StaffPaymentOptions.NONE: // should never happen
        break
    }

    this.setStaffPayment(staffPaymentData)
    this.emitHaveChanges()
  }

  @Emit('haveChanges')
  private emitHaveChanges (): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

::v-deep .v-input .v-label {
  font-weight: normal;
}

::v-deep .v-input--radio-group__input {
  .v-radio:not(:first-child) {
    padding-top: 2rem;
  }
  .v-input--checkbox {
    padding-top: 2rem;
  }
}

::v-deep .v-input--selection-controls__ripple {
  color: $gray7;
}

::v-deep .v-text-field__slot, ::v-deep .v-radio {
  .v-label {
    color: $gray7;
  }
}
</style>

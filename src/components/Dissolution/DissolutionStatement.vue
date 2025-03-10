<template>
  <div id="dissolution-statement">
    <!-- EDIT SECTION -->
    <template v-if="!isSummary">
      <v-row no-gutters class="edit-section">
        <v-col cols="12" sm="3" class="pr-4 d-none d-sm-block">
          <label class="dissolution-statement-title title-label">
            Dissolution Statement
          </label>
        </v-col>

        <v-col cols="12" sm="9">
          <v-radio-group
            v-model="dissolutionStatementType"
            @change="changeDissolutionStatementType"
            class="dissolution-statement-option-list"
            hide-details
          >
            <v-radio
              v-for="(item, index) in getDissolutionStatements"
              :key="index"
              :value="item.key"
              :id="`dissolution-statement-${item.key}`"
            >
              <template slot="label">
                <div v-html="item.value" class="dissolution-statement-option" />
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </template>

    <!-- SUMMARY SECTION -->
    <template v-else>
      <v-row no-gutters class="summary-section">
        <v-col cols="12" sm="3" class="inner-col-1 pr-4">
          <label class="summary-section-title">Dissolution Statement</label>
        </v-col>

        <v-col cols="12" sm="9" class="inner-col-2 pt-4 pt-sm-0">
          <div
            class="dissolution-summary-description"
            v-html="dissolutionStatementDescription"
          />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
// Libraries
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

// Interfaces & enums
import { ActionBindingIF, DissolutionStatementIF, KeyValueIF } from '@/interfaces'
import { DissolutionStatementTypes } from '@/enums'

@Component
export default class DissolutionStatement extends Vue {
  @Prop({ default: false })
  readonly isSummary: boolean

  // Global getters
  @Getter getDissolutionStatements!: Array<KeyValueIF>
  @Getter getDissolutionStatementStep!: DissolutionStatementIF

  // Global setters
  @Action setDissolutionStatementStepData!: ActionBindingIF

  private dissolutionStatementType: DissolutionStatementTypes = null

  /** Called when component is created. */
  created (): void {
    if (this.getDissolutionStatementStep) {
      this.dissolutionStatementType = this.getDissolutionStatementStep.dissolutionStatementType
    }
  }

  /** The dissolution statement description. */
  private get dissolutionStatementDescription (): string {
    const value = this.getDissolutionStatements?.find(
      x => x.key === this.getDissolutionStatementStep.dissolutionStatementType
    )?.value

    return value || '(Not entered)'
  }

  private changeDissolutionStatementType (): void {
    this.setDissolutionStatementStepData({
      valid: !!this.dissolutionStatementType,
      dissolutionStatementType: this.dissolutionStatementType
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.edit-section {
  font-size: $px-16;
  color: $gray7;
}

.dissolution-statement-title,
.summary-section-title {
  font-weight: bold;
  color: $gray9;
}

.dissolution-statement-option-list {
  padding-top: 0;
  margin-top: 0;

  ::v-deep .v-input--selection-controls__input {
    margin-right: 1rem;
  }

  .v-radio {
    align-items: start;
  }

  .v-radio:not(:first-child) {
    padding-top: 1.5rem;
  }
}

.dissolution-statement-option,
.dissolution-summary-description {
  color: $gray7;
  line-height: 1.5rem;
}

.summary-section {
  font-size: $px-16;
}

.inner-col-1 {
  // adjustment to make this inner container column the same width as the outer columns
  // ie, decrease width by 1/2 container margin + padding
  flex: 0 0 calc(25% - 1rem);
}

.inner-col-2 {
  // adjustment to make this inner container column the same width as the outer columns
  // ie, increase width by 1/2 container margin + padding
  flex: 0 0 calc(75% + 1rem);
  max-width: calc(75% + 1rem);
}
</style>

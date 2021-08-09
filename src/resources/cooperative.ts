import { ResourceIF } from '@/interfaces'
import { CorpTypeCd, FilingCodes, NameRequestTypes } from '@/enums'
import { GetCorpFullDescription } from '@bcrs-shared-components/corp-type-module'
import { CoopStepsTemplate } from '@/resources/stepTemplates'

export const CooperativeResource: ResourceIF = {
  entityType: CorpTypeCd.COOP,
  displayName: GetCorpFullDescription(CorpTypeCd.COOP),
  title: '',
  description: '',
  statement: '',
  nameRequestType: NameRequestTypes.CP,
  steps: CoopStepsTemplate,
  filingData: {
    filingTypeCode: FilingCodes.INCORPORATION_CP,
    entityType: CorpTypeCd.COOP
  },
  directors: {
    countMinimum: 3
  },
  shareClasses: {
    countMinimum: null // TBD
  },
  incorporationAgreement: {
    helpSection: [],
    article: 'Sample_articles.pdf',
    documents: [
      {
        code: 'sample',
        description: ''
      },
      {
        code: 'custom',
        description: ''
      }
    ]
  },
  reviewAndConfirm: {
    completingPartyStatement: {
      certifyStatementHeader: null,
      certifyStatements: [],
      certifyClause: `Note: It is an offence to make a false or misleading statement in respect
        of a material fact in a record submitted to the Corporate Registry for filing.
        See section 200 of the Cooperative Association Act.`,
      entityDisplay: 'cooperative association'
    }
  }
}

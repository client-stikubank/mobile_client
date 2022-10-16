import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

export const defaultDate = value =>
  value ? moment(value).format('D MMMM YYYY') : '-'

export const submitDate = value =>
  value ? moment(value).format('YYYY-MM-DD') : null

export const toDate = value => (value ? moment(value).toDate() : null)

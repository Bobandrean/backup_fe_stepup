import { format } from 'date-fns'
import { id } from 'date-fns/locale'

// convert date to format date
export const convertDate = (date) => {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy', { locale: id })
}
export const convertDateToForm = (date) => {
  if (!date) return '-'
  return format(new Date(date), 'dd MM yyyy', { locale: id })
}


// convert date to format sql date
export const convertDateSql = (date) => {
  if (!date) return '-'
  return format(new Date(date), 'yyyy-MM-dd', { locale: id })
}

// how to convert example data 15-06-2023 to 15 Juni 2023
export const convertDateManualToIndo = (date) => {
  if (!date) return '-'
  const dateSplit = date.split('-')
  const month = convertMonth(dateSplit[1])
  return `${dateSplit[0]} ${month} ${dateSplit[2]}`
}

// convert month to indonesian month
export const convertMonth = (month) => {
  if (!month) return '-'

  switch (month) {
    case '01':
      return 'Januari'
    case '02':
      return 'Februari'
    case '03':
      return 'Maret'
    case '04':
      return 'April'
    case '05':
      return 'Mei'
    case '06':
      return 'Juni'
    case '07':
      return 'Juli'
    case '08':
      return 'Agustus'
    case '09':
      return 'September'
    case '10':
      return 'Oktober'
    case '11':
      return 'November'
    case '12':
      return 'Desember'
    default:
      return ''
  }
}

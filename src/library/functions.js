import moment from "moment";

export const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const middleInitial = (middle_name) => {

  let mi = '';

  if (middle_name.length > 1) {
    const i = middle_name.substring(0,1).toUpperCase()
    mi = `${i}.`
  } else {
    const i = middle_name.toUpperCase()
    mi = `${i}.`
  }

  return mi;

}

export const dateTimeNow = () => {

  return moment().format("YYYY-MM-DD hh:mm:ss A")

}

export const moduleAccess = (module,show) => {

  const gates = [...module.gates]

  const i = gates.findIndex(g => g.gate===show)

  return gates[i].value

}

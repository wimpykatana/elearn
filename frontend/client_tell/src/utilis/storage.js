/**
 * LOCAL STORAGE
 *
 */

export function getFromStorage(key) {
  if (!key) {
    return 'Error: Key is missing';
  }
  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }else{
      return null;
    }
  } catch (err) {
    return err;
  }
}

export function setInStorage(key, obj) {
  if (!key) {
    console.error('Error: Key is missing');
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}

export function delStorage(key){
  if(!key){
    return 'Error: Key is missing';
  }
  try{
    localStorage.removeItem(key)
  }catch(err){
    console.log(err)
  }
}

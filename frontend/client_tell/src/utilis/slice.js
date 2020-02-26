export function getFirstLetter(key) {
    if(!key){
        return '•ᴗ•';
    }try{

        let val1 = null;
        let val2 = '';

        let a = key.split(" ");
        
        val1 = a[0].slice(0,1);
        val2 = (a.length > 1) ? a[a.length - 1].slice(0,1) : val2;
        return val1 + val2;
        
    }catch(err){
        return err;
    }
}
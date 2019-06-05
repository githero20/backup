export function handleLeastAmount(input,value) {

    if(input==='amount' && value <= 500){
       value = parseInt(500);
        return value;
    }

}
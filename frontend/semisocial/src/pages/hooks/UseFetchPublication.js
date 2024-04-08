import { getListPublication } from "../helpers/getListPublication"

export const UseFetchPublication = (listPublication, setListPublication, userInfo) => {
    
    if (listPublication.length === 0) {

        getListPublication(userInfo).then((data) => {
            setTimeout(() => { //Tiempo de espera.
                console.log(data);
                setListPublication(data);
            }, 100);
        });

    }
}

import { getListUser } from '../helpers/getListUser'

export const UseFetchListUser = (listUser, setListUser, userInfo) => {

    if (listUser.length === 0) {

        getListUser(userInfo).then((data) => {
            setTimeout(() => { //Tiempo de espera.
                setListUser(data);
            }, 100);
        });

    }
}

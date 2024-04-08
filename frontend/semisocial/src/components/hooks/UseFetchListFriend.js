import { getListFriend } from "../helpers/getListFriend"

export const UseFetchListFriend = (listFriend, setListFriend, userInfo) => {

    if (listFriend.length === 0) {

        getListFriend(userInfo).then((data) => {
            setTimeout(() => { //Tiempo de espera.
                setListFriend(data);
            }, 100);
        });


    }
}

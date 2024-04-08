import { getListFriendRequest } from "../helpers/getListFriendRequest"

export const UseFetchFriendRequest = (listRequest, setListRequest, userInfo) => {

    if (listRequest.length === 0) {

        getListFriendRequest(userInfo).then((data) => {
            setTimeout(() => { //Tiempo de espera.
                setListRequest(data);
            }, 100);
        });

    }
}

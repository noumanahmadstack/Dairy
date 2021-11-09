import { instance } from "./instance";
const post_request = async ({ target, body }) => {
    try {
        const response = await instance.post(target, body)
        return response

    } catch (error) {
        console.log("post error", error);
        return "Error"
    }
}

const get_request = async ({target}) => {
    try {
        const response = await instance.get(target)
        var res = response
        return res

    } catch (error) {
        console.log("get error", error);
        return "Error"
    }
}



export { post_request, get_request }

import { ThreeDots } from "react-loader-spinner"

export default function ThreeDotLoader() {
    return (
        < ThreeDots
            visible={true}
            height="50"
            width="50"
            color="#5fa97d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}
            }
            wrapperClass=""
        />
    )
}
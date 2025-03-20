import toast from "react-hot-toast";
import { ReactSVG } from "react-svg";

type MessageType = {
  type?: "info" | "info-close" | "success" | "error";
  message: string;
};

export default function useFlashMessages() {
  /* This hook relies that the Toaster component is set in the layout.tsx */
  const addFlashMessage = ({ type = "info", message }: MessageType) => {
    // toast(message, {
    //   duration: 4000,
    //   position: "bottom-right",

    //   // Styling
    //   style: {},
    //   className: "",

    //   // Custom Icon
    //   icon: "👏",

    //   // Change colors of success/error/loading icon
    //   iconTheme: {
    //     primary: "#000",
    //     secondary: "#fff",
    //   },

    //   // Aria
    //   ariaProps: {
    //     role: "status",
    //     "aria-live": "polite",
    //   },

    //   // Additional Configuration
    //   removeDelay: 1000,
    // });

    switch (type) {
      case "info":
        toast.success("info", { icon: "👏" });
        break;

      case "success":
        toast.success(message);
        break;

        case "error":
        toast.error(message);
        break;

      case "info-close":
        toast(
          (t: { id: string }) => (
            <span className="flex items-center justify-center text-lg">
              Custom close button
              <button type="button" onClick={() => toast.dismiss(t.id)}>
                <ReactSVG src="/icons/close.svg" />
              </button>
            </span>
          ),
          {
            icon: "🧨",
          } as const
        );
        break;

      default:
        toast.success("default");
        break;
    }
    // // Promise example -------------
    // const fetchData = async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   // throw new Error("An error occurred");
    // };

    // const myPromise = fetchData();

    // toast.promise(myPromise, {
    //   loading: "Loading",
    //   success: "Got the data",
    //   error: "Error when fetching",
    // });
    // // Promise example -------------

    // // Loading example -------------
    // // loading toast wont disappear automatically we will need to call toast.dismiss(toastId);
    // .promise will when resolved or on error.
    // // const toastId = toast.loading("loading");
    // // Loading example -------------

    // toast.success(message);
    // toast.error(message);
  };

  return { addFlashMessage };
}

import { Toaster } from "react-hot-toast";

const ToastComp = () => {
  return (
    <div>
      <Toaster
        position="bottom-center"
        autoClose={50}
        reverseOrder={true}
        toastOptions={{
          style: {
            borderRadius: "100px",
            padding: "10px",
            background: "#333",
            color: "#ddd",
          },
        }}
      />
    </div>
  );
};

export default ToastComp;

import { Test, Test2, Test3 } from "./type";

interface Action {
  type: string;
  payload?: any; 
  loading?: boolean;
}

type Dispatch = (action: Action) => void;

export const GetTest = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch({
      type: Test,
      payload: true,
      loading: true,
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/1`,
      {
        method: "GET",
        headers: {
          accessToken: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      dispatch({
        type: Test2,
        payload: [{ res }], // Replace with specific type if needed
        loading: false,
      });
    } else {
      const res = await response.json();
      dispatch({
        type: Test3,
        payload: [{ res }], // Replace with specific type if needed
        loading: false,
      });
    }
  } catch (error) {
    dispatch({
      type: Test3,
      payload: false,
      loading: false,
    });
    console.error(error);
  }
};

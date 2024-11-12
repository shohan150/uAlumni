import { useState } from "react";
import { actions } from "../../actions";
import CheckIcon from "../../assets/icons/check.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

const Designation = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const [desg, setDesg] = useState(state?.user?.desg);
  const [editMode, setEditMode] = useState(false);

  const handleDesgEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { desg }
      );

      console.log(response, response.data);
      
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      });
    }
  };

  return (
    <div className="mt-2 flex items-start gap-2">
      <div className="flex-1">
        {!editMode ? (
          <p className="text-textBlye lg:text-lg">
            Designation :{" "}
            <span className={`${!state?.user?.desg && "text-gray-400"}`}>{state?.user?.desg ? state?.user?.desg : "Your Designation"}</span>
          </p>
        ) : (
          <input
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={desg}
            type="text"
            onChange={(e) => setDesg(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={() => setEditMode(true)}
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={handleDesgEdit}
        >
          <img src={CheckIcon} alt="Check" />
        </button>
      )}
    </div>
  );
};

export default Designation;

import React, { useReducer, useContext } from "react";

import axios from "axios";
import ConfigContext from "./configContext";
import ConfigReducer from "./configReducer";
import { GET_CONFIG, CONFIG_ERROR } from "../types";

// Create a custom hook to use the config context
export const useConfig = () => {
  const { state, dispatch } = useContext(ConfigContext);
  return [state, dispatch];
};

// // get config from api
export const getConfig = async (dispatch) => {
  // uncomment code block and add your url to the backend api
  // // req config from api (nb: set loadingConfig to default to true)
  // try {
  //   const res = await axios.get(
  //     "https://url/to/api/getConfig/fr"
  //     // "path/to/api"
  //   );
  //   // console.log(res.data);
  //   dispatch({
  //     type: GET_CONFIG,
  //     payload: res.data,
  //   });
  // } catch (error) {
  //   // console.log(error);
  //   dispatch({
  //     type: CONFIG_ERROR,
  //   });
  // }
};

const ConfigState = (props) => {
  const initialState = {
    config: {
      alert_email_validity: "Veuillez entrer une adresse email valide",
      alert_file_upload_choice: "Veuillez choisir un fichier à uploader",
      alert_file_upload_error:
        "Il y a eu un problème durant l'upload du fichier",
      alert_file_upload_success: "Le fichier a été uploadé",
      alert_number_validity: "Veuillez entrer un nombre entre",
      alert_phone_number_validity:
        "Veuillez entrer un numéro de téléphone valide",
      alert_choice: "Veuillez faire un choix",
      alert_empty_field: "Veuillez remplir ce champ",
      alert_max_input_size: "Votre réponse doit faire moins de 256 caractères",
      placeholder_email: "Entrez votre adresse électronique",
      placeholder_long_text: "Entrez votre commentaire",
      placeholder_number: "Entrez un nombre",
      placeholder_phone_number: "Entrez votre numéro",
      placeholder_short_text: "Entrez votre réponse",
      button_start: "Démarrer",
      button_continue: "Continuer",
      button_restart: "Recommencer",
      button_upload: "Envoyer",
      button_submit: "Soumettre",
      terms_conditions: "Terms & Conditions",
      submit_error: "Il y a eu un problème durant l'upload, veuillez réessayer",
      keyboard_nav: "appuyez sur Entrée ↵",
      keyboard_nav_validate: "appuyez sur Entrée ↵ pour valider  ",
      keyboard_nav_new_line:
        "appuyez sur Entrée ↵ et Shift ⇧ pour une nouvelle ligne",
      placeholder_file_upload: "choisissez un fichier",
    },
    loadingConfig: false, // switch to true
    errorLoadingConfig: false,
  };

  const [state, dispatch] = useReducer(ConfigReducer, initialState);

  return (
    <ConfigContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ConfigState;
